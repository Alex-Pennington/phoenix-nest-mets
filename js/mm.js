// Phoenix Nest METS - Mattermost Send via Backend API
// Posts to /api/send which relays to MM server-side (no CORS issues)

var METS_API = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'http://localhost:5100'
  : '/api';

var API_SEND = METS_API + (METS_API.endsWith('/api') ? '/send' : '/api/send');
var API_QUEUE = METS_API + (METS_API.endsWith('/api') ? '/queue' : '/api/queue');

var SCHEMA_URL = 'https://mets.firewood.ltd/schema.json';

var FORM_NAMES = {
  evaluation: 'MET Evaluation',
  daily: 'Daily Operations Log',
  weekly: 'Weekly Checklist'
};

App.buildPayload = function(log) {
  return {
    _schema: SCHEMA_URL,
    _version: '1.0.0',
    _form: log.type,
    _formName: FORM_NAMES[log.type] || log.type,
    _id: log.id,
    _date: log.date,
    _completed: log.completed || false,
    _completedAt: log.completedAt || null,
    _savedAt: log.savedAt || null,
    _sentAt: new Date().toISOString(),
    data: log.data || {}
  };
};

App.sendLogToMM = async function(logId, btn) {
  var log = await db.getChecklist(logId);
  if (!log) return;

  var payload = App.buildPayload(log);
  if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

  try {
    var resp = await fetch(API_SEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (resp.ok) {
      var result = await resp.json();
      log.sent = true;
      log.sentAt = result.sentAt || new Date().toISOString();
      await db._put('checklists', log);
      if (btn) { btn.textContent = 'Sent ✓'; btn.classList.add('log-sent-done'); }
    } else {
      throw new Error('Server returned ' + resp.status);
    }
  } catch (e) {
    // Queue for Background Sync if available
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      await db.queueSend(payload);
      if (btn) { btn.textContent = 'Queued ⏳'; btn.disabled = true; }
      var reg = await navigator.serviceWorker.ready;
      await reg.sync.register('send-logs');
    } else {
      if (btn) { btn.textContent = 'Failed - Retry'; btn.disabled = false; }
    }
  }
};
