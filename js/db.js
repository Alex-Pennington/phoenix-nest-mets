// Phoenix Nest Training App - Local Database (IndexedDB)
// Stores contractor profiles, evaluation records, and progress

const DB_NAME = 'phoenix_nest_training';
const DB_VERSION = 1;

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
