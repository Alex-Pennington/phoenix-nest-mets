// Phoenix Nest Training App - Local Database (IndexedDB)
// Stores contractor profiles, evaluation records, and progress

const DB_NAME = 'phoenix_nest_training';
const DB_VERSION = 3;

class TrainingDB {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Contractors store
        if (!db.objectStoreNames.contains('contractors')) {
          const store = db.createObjectStore('contractors', { keyPath: 'id', autoIncrement: true });
          store.createIndex('name', 'name', { unique: false });
          store.createIndex('currentTier', 'currentTier', { unique: false });
        }

        // Evaluations store
        if (!db.objectStoreNames.contains('evaluations')) {
          const store = db.createObjectStore('evaluations', { keyPath: 'id', autoIncrement: true });
          store.createIndex('contractorId', 'contractorId', { unique: false });
          store.createIndex('taskId', 'taskId', { unique: false });
          store.createIndex('date', 'date', { unique: false });
          store.createIndex('contractor_task', ['contractorId', 'taskId'], { unique: false });
        }

        // Checklists store
        if (!db.objectStoreNames.contains('checklists')) {
          const store = db.createObjectStore('checklists', { keyPath: 'id', autoIncrement: true });
          store.createIndex('type', 'type', { unique: false });
          store.createIndex('date', 'date', { unique: false });
          store.createIndex('type_date', ['type', 'date'], { unique: false });
        }

        // Outbox store (Background Sync queue)
        if (!db.objectStoreNames.contains('outbox')) {
          db.createObjectStore('outbox', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  // ─── Contractors ───

  async addContractor(contractor) {
    return this._add('contractors', {
      ...contractor,
      currentTier: contractor.currentTier || 1,
      startDate: contractor.startDate || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    });
  }

  async getContractor(id) {
    return this._get('contractors', id);
  }

  async getAllContractors() {
    return this._getAll('contractors');
  }

  async updateContractor(contractor) {
    return this._put('contractors', contractor);
  }

  async deleteContractor(id) {
    return this._delete('contractors', id);
  }

  // ─── Evaluations ───

  async saveEvaluation(evaluation) {
    const record = {
      ...evaluation,
      date: evaluation.date || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // Check if there's an existing evaluation for this contractor+task
    const existing = await this.getEvaluation(evaluation.contractorId, evaluation.taskId);
    if (existing) {
      record.id = existing.id;
      return this._put('evaluations', record);
    }
    return this._add('evaluations', record);
  }

  async getEvaluation(contractorId, taskId) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('evaluations', 'readonly');
      const store = tx.objectStore('evaluations');
      const index = store.index('contractor_task');
      const request = index.get([contractorId, taskId]);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getContractorEvaluations(contractorId) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction('evaluations', 'readonly');
      const store = tx.objectStore('evaluations');
      const index = store.index('contractorId');
      const request = index.getAll(contractorId);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteEvaluation(id) {
    return this._delete('evaluations', id);
  }

  // ─── Progress Helpers ───

  async getContractorProgress(contractorId) {
    const evals = await this.getContractorEvaluations(contractorId);
    const progress = {};

    for (const tier of TIERS) {
      const tierTasks = tier.sections.flatMap(s => s.tasks);
      const passed = tierTasks.filter(taskId => {
        const ev = evals.find(e => e.taskId === taskId);
        return ev && ev.result === 'GO';
      });
      progress[tier.id] = {
        total: tierTasks.length,
        passed: passed.length,
        percent: Math.round((passed.length / tierTasks.length) * 100)
      };
    }

    return progress;
  }

  // ─── Outbox (Background Sync queue) ───

  async queueSend(payload) {
    return this._add('outbox', {
      payload: payload,
      queuedAt: new Date().toISOString()
    });
  }

  async getOutbox() {
    return this._getAll('outbox');
  }

  async removeFromOutbox(id) {
    return this._delete('outbox', id);
  }

  // ─── Employee Sync from API ───

  async syncEmployees() {
    try {
      var apiBase = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
        ? 'http://localhost:5100' : '';
      var resp = await fetch(apiBase + '/api/employees');
      if (!resp.ok) return false;
      var remote = await resp.json();
      if (!Array.isArray(remote) || remote.length === 0) return false;

      var local = await this.getAllContractors();
      var localByOdoo = {};
      local.forEach(c => { if (c.odooId) localByOdoo[c.odooId] = c; });

      for (var emp of remote) {
        var existing = localByOdoo[emp.odooId];
        if (existing) {
          if (existing.name !== emp.name || existing.role !== emp.role) {
            existing.name = emp.name;
            existing.role = emp.role;
            existing.phone = emp.phone;
            existing.email = emp.email;
            await this._put('contractors', existing);
          }
        } else {
          await this.addContractor({
            odooId: emp.odooId,
            name: emp.name,
            role: emp.role,
            phone: emp.phone,
            email: emp.email,
            currentTier: 1
          });
        }
      }
      return true;
    } catch (e) {
      console.log('Employee sync failed (offline?)', e);
      return false;
    }
  }

  // ─── Generic CRUD ───

  _add(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const request = tx.objectStore(storeName).add(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  _get(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const request = tx.objectStore(storeName).get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // ─── Checklists ───

  async saveChecklist(checklist) {
    return this._add('checklists', {
      ...checklist,
      savedAt: new Date().toISOString()
    });
  }

  async getChecklists(type) {
    const all = await this._getAll('checklists');
    return all.filter(c => c.type === type).sort((a, b) => b.date > a.date ? 1 : -1);
  }

  async getChecklist(id) {
    return this._get('checklists', id);
  }

  // ─── Helpers ───

  _getAll(storeName) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const request = tx.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  _put(storeName, data) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const request = tx.objectStore(storeName).put(data);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  _delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const request = tx.objectStore(storeName).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}

const db = new TrainingDB();
