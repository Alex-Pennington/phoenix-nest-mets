# Phoenix Nest METS Backend
# Flask API for Mattermost relay, Odoo employee sync, and offline queue

import os
import json
import logging
import requests
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

logging.basicConfig(level=logging.INFO)
log = logging.getLogger('mets-api')

# ─── Config from environment ───

MM_BASE = os.getenv('MM_BASE_URL', 'https://chat.firewood.ltd')
MM_HOOKS = {
    'evaluation': os.getenv('MM_HOOK_TRAINING', ''),
    'daily': os.getenv('MM_HOOK_OPS', ''),
    'weekly': os.getenv('MM_HOOK_OPS', ''),
}

# Odoo XML-RPC — fill these in .env, do NOT hardcode
ODOO_URL = os.getenv('ODOO_URL', '')
ODOO_DB = os.getenv('ODOO_DB', '')
ODOO_USER = os.getenv('ODOO_USER', '')
ODOO_PASS = os.getenv('ODOO_PASS', '')


# ─── Odoo connection helper ───

def odoo_connect():
    """Authenticate to Odoo via XML-RPC. Returns (uid, models) or raises."""
    if not all([ODOO_URL, ODOO_DB, ODOO_USER, ODOO_PASS]):
        raise Exception('Odoo credentials not configured in .env')
    import xmlrpc.client
    common = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/common')
    uid = common.authenticate(ODOO_DB, ODOO_USER, ODOO_PASS, {})
    if not uid:
        raise Exception('Odoo authentication failed')
    models = xmlrpc.client.ServerProxy(f'{ODOO_URL}/xmlrpc/2/object')
    return uid, models


# ─── POST /api/send ───

@app.route('/api/send', methods=['POST'])
def send_to_mattermost():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No JSON body'}), 400

        form_type = data.get('_form', 'daily')
        hook_id = MM_HOOKS.get(form_type, MM_HOOKS['daily'])
        if not hook_id:
            return jsonify({'error': 'No webhook configured for ' + form_type}), 500
        hook_url = f'{MM_BASE}/hooks/{hook_id}'

        mm_text = '```json\n' + json.dumps(data, indent=2) + '\n```'
        resp = requests.post(hook_url, json={'text': mm_text}, timeout=10)

        if resp.status_code == 200:
            log.info(f'Sent {form_type} log {data.get("_id")} to Mattermost')
            return jsonify({'ok': True, 'sentAt': datetime.utcnow().isoformat() + 'Z'})
        else:
            log.error(f'MM webhook returned {resp.status_code}: {resp.text}')
            return jsonify({'error': f'Mattermost returned {resp.status_code}'}), 502

    except requests.exceptions.Timeout:
        return jsonify({'error': 'Mattermost timeout'}), 504
    except Exception as e:
        log.exception('Send failed')
        return jsonify({'error': str(e)}), 500


# ─── POST /api/queue ───
# Batch send for Background Sync (multiple queued logs at once)

@app.route('/api/queue', methods=['POST'])
def send_queue():
    try:
        items = request.get_json()
        if not isinstance(items, list):
            return jsonify({'error': 'Expected JSON array'}), 400

        results = []
        for data in items:
            form_type = data.get('_form', 'daily')
            hook_id = MM_HOOKS.get(form_type, MM_HOOKS['daily'])
            hook_url = f'{MM_BASE}/hooks/{hook_id}'
            mm_text = '```json\n' + json.dumps(data, indent=2) + '\n```'

            try:
                resp = requests.post(hook_url, json={'text': mm_text}, timeout=10)
                results.append({
                    '_id': data.get('_id'),
                    'ok': resp.status_code == 200,
                    'sentAt': datetime.utcnow().isoformat() + 'Z'
                })
            except Exception as e:
                results.append({'_id': data.get('_id'), 'ok': False, 'error': str(e)})

        return jsonify(results)

    except Exception as e:
        log.exception('Queue send failed')
        return jsonify({'error': str(e)}), 500


# ─── GET /api/employees ───
# Pull employee list from Odoo hr.employee

@app.route('/api/employees', methods=['GET'])
def get_employees():
    try:
        uid, models = odoo_connect()

        # TODO: Kvasir — verify these fields exist in your Odoo version.
        # Adjust the field list and domain filter as needed.
        employees = models.execute_kw(
            ODOO_DB, uid, ODOO_PASS,
            'hr.employee', 'search_read',
            [[['active', '=', True]]],
            {'fields': ['id', 'name', 'job_title', 'work_phone', 'work_email'],
             'order': 'name asc'}
        )

        result = []
        for emp in employees:
            result.append({
                'odooId': emp['id'],
                'name': emp['name'],
                'role': emp.get('job_title') or '',
                'phone': emp.get('work_phone') or '',
                'email': emp.get('work_email') or '',
            })

        return jsonify(result)

    except Exception as e:
        log.exception('Odoo employee fetch failed')
        return jsonify({'error': str(e)}), 500


# ─── Health check ───

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'service': 'mets-api'})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5100, debug=True)
