// Phoenix Nest Training App - Main Application Logic

const App = {
  currentView: 'home',
  viewStack: [],
  selectedContractorId: null,

  async init() {
    await db.init();
    this.bindNavigation();
    var route = this.parseHash();
    if (route) {
      this.navigate(route.view, route.data);
    } else {
      this.navigate('home');
    }
    window.addEventListener('hashchange', () => {
      var r = this.parseHash();
      if (r && (r.view !== this.currentView || JSON.stringify(r.data) !== JSON.stringify(this._currentData || {}))) {
        this.viewStack = [];
        this.renderView(r.view, r.data);
      }
    });
  },

  parseHash() {
    var h = location.hash.replace('#', '');
    if (!h) return null;
    var parts = h.split('/');
    var view = parts[0];
    var param = parts.slice(1).join('/');
    switch (view) {
      case 'home': return { view: 'home', data: {} };
      case 'guide': return param ? { view: 'tier-tasks', data: { tierId: param } } : { view: 'guide', data: {} };
      case 'task': return param ? { view: 'task', data: { taskId: param } } : { view: 'guide', data: {} };
      case 'evaluate': return param ? { view: 'evaluate', data: { taskId: param } } : { view: 'guide', data: {} };
      case 'ops': return { view: 'ops', data: {} };
      case 'team': return { view: 'team', data: {} };
      case 'logs': return { view: 'logs', data: {} };
      default: return { view: 'home', data: {} };
    }
  },

  viewToHash(view, data) {
    switch (view) {
      case 'home': return '#home';
      case 'guide': return '#guide';
      case 'tier-tasks': return '#guide/' + (data.tierId || '');
      case 'task': return '#task/' + (data.taskId || '');
      case 'evaluate': return '#evaluate/' + (data.taskId || '');
      case 'ops': return '#ops';
      case 'checklist-fill': return '#ops';
      case 'checklist-view': return '#logs';
      case 'team': return '#team';
      case 'logs': return '#logs';
      default: return '#home';
    }
  },

  bindNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        this.viewStack = [];
        this.navigate(view);
      });
    });

    // Back button
    document.getElementById('btn-back').addEventListener('click', () => {
      if (this.viewStack.length > 0) {
        const prev = this.viewStack.pop();
        this.renderView(prev.view, prev.data);
      }
    });
  },

  navigate(view, data = {}) {
    if (this.currentView !== view || Object.keys(data).length > 0) {
      if (this.currentView !== 'home' || view !== 'home') {
        this.viewStack.push({ view: this.currentView, data: this._currentData || {} });
      }
    }
    var newHash = this.viewToHash(view, data);
    if (location.hash !== newHash) {
      history.replaceState(null, '', newHash);
    }
    this.renderView(view, data);
  },

  renderView(view, data = {}) {
    this.currentView = view;
    this._currentData = data;
    const content = document.getElementById('content');
    const backBtn = document.getElementById('btn-back');
    const title = document.getElementById('header-title');

    // Update nav highlights
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-btn[data-view="${view === 'task' || view === 'evaluate' || view === 'tier-tasks' ? 'guide' : view === 'checklist-fill' || view === 'checklist-view' ? 'ops' : view}"]`);
    if (activeNav) activeNav.classList.add('active');

    // Back button visibility
    backBtn.style.display = this.viewStack.length > 1 ? 'flex' : 'none';

    switch (view) {
      case 'home':
        title.textContent = 'Phoenix Nest';
        content.innerHTML = this.renderHome();
        break;
      case 'guide':
        title.textContent = 'Training Guide';
        content.innerHTML = this.renderGuide();
        break;
      case 'tier-tasks':
        title.textContent = data.tier?.label || 'Tasks';
        content.innerHTML = this.renderTierTasks(data.tier);
        break;
      case 'task':
        title.textContent = data.taskId || 'Task';
        content.innerHTML = this.renderTask(data.taskId);
        break;
      case 'evaluate':
        title.textContent = 'Evaluate';
        content.innerHTML = this.renderEvaluate(data.taskId, data.contractorId);
        break;
      case 'team':
        title.textContent = 'Team';
        content.innerHTML = this.renderTeam();
        break;
      case 'contractor':
        title.textContent = 'Progress';
        this.renderContractor(data.contractorId).then(html => { content.innerHTML = html; });
        break;
      case 'add-contractor':
        title.textContent = 'Add Contractor';
        content.innerHTML = this.renderAddContractor();
        break;
      case 'logs':
        title.textContent = 'Logs';
        this.renderLogs().then(html => { content.innerHTML = html; this.bindLogsEvents(); });
        break;
      case 'ops':
        title.textContent = 'Operations';
        content.innerHTML = this.renderOps();
        break;
      case 'checklist-fill':
        title.textContent = data.checklist?.title || CHECKLISTS[data.checklistType]?.title || 'Checklist';
        if (data.resumeId) {
          db.getChecklist(data.resumeId).then(log => {
            content.innerHTML = this.renderChecklistForm(data.checklistType, log ? log.data : null);
            this.bindChecklistEvents(data.checklistType, data.resumeId);
          });
        } else {
          content.innerHTML = this.renderChecklistForm(data.checklistType);
          this.bindChecklistEvents(data.checklistType);
        }
        break;
      case 'checklist-view':
        title.textContent = 'Log Detail';
        this.renderChecklistView(data.logId).then(html => { content.innerHTML = html; });
        break;
    }

    // Bind events after render
    this.bindViewEvents(view, data);
    content.scrollTop = 0;
  },

  // ═══════════════════════════════════════
  // HOME VIEW
  // ═══════════════════════════════════════

  renderHome() {
    return `
      <div class="home-hero">
        <div class="hero-icon">🔥</div>
        <h1 class="hero-title">PHOENIX NEST</h1>
        <p class="hero-sub">Training & Evaluation Guide</p>
        <p class="hero-meta">MET Format • 38 Task Cards • 4 Tier Levels • v25</p>
      </div>

      <div class="home-grid">
        <button class="home-card" data-action="guide">
          <span class="hc-icon">📋</span>
          <span class="hc-label">Training Guide</span>
          <span class="hc-desc">Browse all task cards by tier</span>
        </button>
        <button class="home-card" data-action="team">
          <span class="hc-icon">👥</span>
          <span class="hc-label">Team</span>
          <span class="hc-desc">Contractor progress tracking</span>
        </button>
        <button class="home-card" data-action="quick-ref">
          <span class="hc-icon">⚡</span>
          <span class="hc-label">Quick Reference</span>
          <span class="hc-desc">Safety-critical tasks</span>
        </button>
        <button class="home-card" data-action="search">
          <span class="hc-icon">🔍</span>
          <span class="hc-label">Search</span>
          <span class="hc-desc">Find any task by keyword</span>
        </button>
      </div>

      <div class="home-stats">
        <div class="stat-row">
          <span class="stat-label">Tier 1→2</span>
          <span class="stat-value">14 tasks</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Tier 2→3</span>
          <span class="stat-value">11 tasks</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">Tier 3→4</span>
          <span class="stat-value">4 tasks</span>
        </div>
      </div>
    `;
  },

  // ═══════════════════════════════════════
  // GUIDE VIEW - Tier listing
  // ═══════════════════════════════════════

  renderGuide() {
    let html = '<div class="guide-container">';
    for (const tier of TIERS) {
      const taskCount = tier.sections.reduce((sum, s) => sum + s.tasks.length, 0);
      html += `
        <button class="tier-card" data-tier-id="${tier.id}" style="--tier-color: ${tier.color}">
          <div class="tc-header">
            <span class="tc-label">${tier.label}</span>
            <span class="tc-badge">${taskCount} tasks</span>
          </div>
          <div class="tc-title">${tier.title}</div>
          <div class="tc-sections">
            ${tier.sections.map(s => `<span class="tc-section">${s.icon} ${s.name}</span>`).join('')}
          </div>
          <div class="tc-arrow">›</div>
        </button>
      `;
    }
    html += '</div>';
    return html;
  },

  // ═══════════════════════════════════════
  // TIER TASKS VIEW - Tasks within a tier
  // ═══════════════════════════════════════

  renderTierTasks(tier) {
    if (!tier) return '<p>Tier not found</p>';
    let html = `<div class="tier-tasks-container">`;

    for (const section of tier.sections) {
      html += `<div class="section-header">${section.icon} ${section.name}</div>`;
      for (const taskId of section.tasks) {
        const task = TASKS[taskId];
        if (!task) continue;
        html += `
          <button class="task-list-item" data-task-id="${taskId}">
            <div class="tli-left">
              <span class="tli-id">${taskId}</span>
              <span class="tli-title">${task.title}</span>
            </div>
            ${task.safetyCritical ? '<span class="tli-safety">⚠️</span>' : ''}
            <span class="tli-arrow">›</span>
          </button>
        `;
      }
    }
    html += '</div>';
    return html;
  },

  // ═══════════════════════════════════════
  // TASK DETAIL VIEW - Full MET card
  // ═══════════════════════════════════════

  renderTask(taskId) {
    const task = TASKS[taskId];
    if (!task) return '<p>Task not found</p>';

    let html = `<div class="task-detail">`;

    // Header
    html += `
      <div class="td-header ${task.safetyCritical ? 'safety-critical' : ''}">
        <div class="td-id">${task.id}</div>
        <h2 class="td-title">${task.title}</h2>
        ${task.safetyCritical ? '<span class="td-safety-badge">⚠️ SAFETY CRITICAL</span>' : ''}
      </div>
    `;

    // Conditions
    html += `<div class="td-section">
      <h3 class="td-section-title">CONDITIONS</h3>
      <ul class="td-list">
        ${task.conditions.map(c => `<li>${c}</li>`).join('')}
      </ul>
    </div>`;

    // Standards
    html += `<div class="td-section">
      <h3 class="td-section-title">STANDARDS</h3>
      <ul class="td-list">
        ${task.standards.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>`;

    // Performance Steps
    html += `<div class="td-section">
      <h3 class="td-section-title">PERFORMANCE STEPS</h3>
      <ol class="td-steps">`;
    task.perfSteps.forEach((step, i) => {
      if (step.substeps) {
        html += `<li class="step-with-subs">
          <strong>${step.text}</strong>
          <ol type="a" class="td-substeps">
            ${step.substeps.map(ss => `<li>${ss}</li>`).join('')}
          </ol>
        </li>`;
      } else {
        html += `<li>${step.text}</li>`;
      }
    });
    html += `</ol></div>`;

    // GO/NO-GO
    html += `<div class="td-section">
      <h3 class="td-section-title">GO / NO-GO CRITERIA</h3>
      <div class="gng-list">
        ${task.goNoGo.map((item, i) => `
          <div class="gng-item">
            <span class="gng-num">${i + 1}</span>
            <span class="gng-text">${item}</span>
          </div>
        `).join('')}
      </div>
    </div>`;

    // Notes
    if (task.notes && task.notes.length > 0) {
      html += `<div class="td-section td-notes">
        <h3 class="td-section-title">EVALUATOR NOTES</h3>
        ${task.notes.map(n => `<p class="note-text">${n}</p>`).join('')}
      </div>`;
    }

    // References
    html += `<div class="td-section td-refs">
      <h3 class="td-section-title">REFERENCES</h3>
      <p>${task.references}</p>
    </div>`;

    // Action button
    html += `
      <button class="btn-evaluate" data-task-id="${taskId}">
        ✏️ Start Evaluation
      </button>
    `;

    html += '</div>';
    return html;
  },

  // ═══════════════════════════════════════
  // EVALUATE VIEW - GO/NO-GO checklist
  // ═══════════════════════════════════════

  renderEvaluate(taskId, contractorId) {
    const task = TASKS[taskId];
    if (!task) return '<p>Task not found</p>';

    let html = `<div class="eval-container">
      <div class="eval-header">
        <span class="eval-id">${task.id}</span>
        <span class="eval-title">${task.title}</span>
      </div>

      <div class="eval-field">
        <label>Contractor</label>
        <select id="eval-contractor" class="eval-select">
          <option value="">Select contractor...</option>
        </select>
        <button class="btn-inline" id="btn-add-contractor-inline">+ New</button>
      </div>

      <div class="eval-field">
        <label>Date</label>
        <input type="date" id="eval-date" class="eval-input" value="${new Date().toISOString().split('T')[0]}">
      </div>

      <div class="eval-field">
        <label>Evaluator</label>
        <input type="text" id="eval-evaluator" class="eval-input" placeholder="Your name" value="">
      </div>

      <h3 class="eval-section-title">GO / NO-GO</h3>
      <div class="eval-checklist">
        ${task.goNoGo.map((item, i) => `
          <div class="eval-check-item" data-index="${i}">
            <div class="eval-check-text">${item}</div>
            <div class="eval-check-btns">
              <button class="eval-go-btn" data-index="${i}" data-value="GO">GO</button>
              <button class="eval-nogo-btn" data-index="${i}" data-value="NO-GO">NO-GO</button>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="eval-field">
        <label>Notes</label>
        <textarea id="eval-notes" class="eval-textarea" rows="3" placeholder="Optional evaluator notes..."></textarea>
      </div>

      <div class="eval-result-bar" id="eval-result-bar" style="display:none">
        <div class="eval-result-label" id="eval-result-label"></div>
      </div>

      <div class="eval-actions">
        <button class="btn-save-eval" id="btn-save-eval" disabled>Save Evaluation</button>
      </div>
    </div>`;

    return html;
  },

  // ═══════════════════════════════════════
  // TEAM VIEW - Contractor list
  // ═══════════════════════════════════════

  renderTeam() {
    return `
      <div class="team-container">
        <div class="team-header-row">
          <h2>Production Team</h2>
          <button class="btn-add" id="btn-add-contractor">+ Add</button>
        </div>
        <div id="team-list" class="team-list">
          <div class="loading">Loading...</div>
        </div>
      </div>
    `;
  },

  async loadTeamList() {
    const contractors = await db.getAllContractors();
    const list = document.getElementById('team-list');
    if (!list) return;

    if (contractors.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <p>No contractors yet.</p>
          <button class="btn-add" id="btn-add-first">+ Add First Contractor</button>
        </div>
      `;
      const btn = document.getElementById('btn-add-first');
      if (btn) btn.addEventListener('click', () => this.navigate('add-contractor'));
      return;
    }

    let html = '';
    for (const c of contractors) {
      const progress = await db.getContractorProgress(c.id);
      const tierKey = c.currentTier === 1 ? 'tier1to2' : c.currentTier === 2 ? 'tier2to3' : 'tier3to4';
      const p = progress[tierKey] || { passed: 0, total: 1, percent: 0 };

      html += `
        <button class="contractor-card" data-contractor-id="${c.id}">
          <div class="cc-top">
            <span class="cc-name">${c.name}</span>
            <span class="cc-tier">Tier ${c.currentTier}</span>
          </div>
          <div class="cc-progress">
            <div class="cc-progress-bar">
              <div class="cc-progress-fill" style="width: ${p.percent}%"></div>
            </div>
            <span class="cc-progress-text">${p.passed}/${p.total} (${p.percent}%)</span>
          </div>
          <div class="cc-started">Started: ${c.startDate}</div>
        </button>
      `;
    }
    list.innerHTML = html;

    // Bind clicks
    list.querySelectorAll('.contractor-card').forEach(card => {
      card.addEventListener('click', () => {
        this.navigate('contractor', { contractorId: parseInt(card.dataset.contractorId) });
      });
    });
  },

  // ═══════════════════════════════════════
  // CONTRACTOR DETAIL VIEW
  // ═══════════════════════════════════════

  async renderContractor(contractorId) {
    const c = await db.getContractor(contractorId);
    if (!c) return '<p>Contractor not found</p>';

    const evals = await db.getContractorEvaluations(contractorId);
    const progress = await db.getContractorProgress(contractorId);

    let html = `<div class="contractor-detail">
      <div class="cd-header">
        <h2>${c.name}</h2>
        <span class="cd-tier">Current: Tier ${c.currentTier}</span>
      </div>
      <div class="cd-meta">
        <span>Started: ${c.startDate}</span>
      </div>
    `;

    // Progress by tier
    for (const tier of TIERS) {
      const p = progress[tier.id];
      const isCurrentTier = (tier.id === 'tier1to2' && c.currentTier === 1)
        || (tier.id === 'tier2to3' && c.currentTier === 2)
        || (tier.id === 'tier3to4' && c.currentTier === 3);

      html += `
        <div class="cd-tier-section ${isCurrentTier ? 'current-tier' : ''}">
          <div class="cd-tier-header">
            <span>${tier.label}: ${tier.title}</span>
            <span class="cd-tier-pct">${p.percent}%</span>
          </div>
          <div class="cd-progress-bar">
            <div class="cd-progress-fill" style="width: ${p.percent}%; background: ${tier.color}"></div>
          </div>
      `;

      for (const section of tier.sections) {
        html += `<div class="cd-section-name">${section.icon} ${section.name}</div>`;
        for (const taskId of section.tasks) {
          const task = TASKS[taskId];
          const ev = evals.find(e => e.taskId === taskId);
          const status = ev ? ev.result : 'pending';
          const statusClass = status === 'GO' ? 'pass' : status === 'NO-GO' ? 'fail' : 'pending';
          const statusIcon = status === 'GO' ? '✅' : status === 'NO-GO' ? '❌' : '○';

          html += `
            <div class="cd-task-row ${statusClass}">
              <span class="cd-task-status">${statusIcon}</span>
              <span class="cd-task-id">${taskId}</span>
              <span class="cd-task-title">${task.title}</span>
              ${ev ? `<span class="cd-task-date">${new Date(ev.date).toLocaleDateString()}</span>` : ''}
            </div>
          `;
        }
      }
      html += `</div>`;
    }

    // Actions
    html += `
      <div class="cd-actions">
        <button class="btn-delete-contractor" data-id="${c.id}">🗑️ Remove Contractor</button>
      </div>
    </div>`;

    return html;
  },

  // ═══════════════════════════════════════
  // ADD CONTRACTOR VIEW
  // ═══════════════════════════════════════

  renderAddContractor() {
    return `
      <div class="form-container">
        <div class="form-field">
          <label>Contractor Name</label>
          <input type="text" id="new-name" class="form-input" placeholder="Full name" autofocus>
        </div>
        <div class="form-field">
          <label>Starting Tier</label>
          <select id="new-tier" class="form-select">
            <option value="1">Tier 1 — Trainee</option>
            <option value="2">Tier 2 — Operator</option>
            <option value="3">Tier 3 — Skilled Operator</option>
          </select>
        </div>
        <div class="form-field">
          <label>Start Date</label>
          <input type="date" id="new-start-date" class="form-input" value="${new Date().toISOString().split('T')[0]}">
        </div>
        <button class="btn-save" id="btn-save-contractor">Save Contractor</button>
      </div>
    `;
  },

  // ═══════════════════════════════════════
  // EVENT BINDING
  // ═══════════════════════════════════════

  bindViewEvents(view, data) {
    switch (view) {
      case 'home':
        document.querySelectorAll('.home-card').forEach(card => {
          card.addEventListener('click', () => {
            const action = card.dataset.action;
            if (action === 'guide') this.navigate('guide');
            else if (action === 'team') this.navigate('team');
            else if (action === 'quick-ref') this.showSafetyCritical();
            else if (action === 'search') this.showSearch();
          });
        });
        break;

      case 'guide':
        document.querySelectorAll('.tier-card').forEach(card => {
          card.addEventListener('click', () => {
            const tier = TIERS.find(t => t.id === card.dataset.tierId);
            this.navigate('tier-tasks', { tier });
          });
        });
        break;

      case 'ops':
        document.querySelectorAll('.ops-card').forEach(card => {
          card.addEventListener('click', () => {
            var action = card.dataset.action;
            this.navigate('checklist-fill', { checklistType: action });
          });
        });
        this.checkOpsResume();
        break;

      case 'tier-tasks':
        document.querySelectorAll('.task-list-item').forEach(item => {
          item.addEventListener('click', () => {
            this.navigate('task', { taskId: item.dataset.taskId });
          });
        });
        break;

      case 'task':
        const evalBtn = document.querySelector('.btn-evaluate');
        if (evalBtn) {
          evalBtn.addEventListener('click', () => {
            this.navigate('evaluate', { taskId: evalBtn.dataset.taskId });
          });
        }
        break;

      case 'evaluate':
        this.bindEvaluateEvents(data.taskId);
        break;

      case 'team':
        this.loadTeamList();
        const addBtn = document.getElementById('btn-add-contractor');
        if (addBtn) addBtn.addEventListener('click', () => this.navigate('add-contractor'));
        break;

      case 'contractor':
        setTimeout(() => {
          const delBtn = document.querySelector('.btn-delete-contractor');
          if (delBtn) {
            delBtn.addEventListener('click', async () => {
              if (confirm('Remove this contractor and all their evaluations?')) {
                const id = parseInt(delBtn.dataset.id);
                // Delete all evaluations for this contractor
                const evals = await db.getContractorEvaluations(id);
                for (const ev of evals) await db.deleteEvaluation(ev.id);
                await db.deleteContractor(id);
                this.viewStack = [];
                this.navigate('team');
              }
            });
          }
        }, 100);
        break;

      case 'add-contractor':
        const saveBtn = document.getElementById('btn-save-contractor');
        if (saveBtn) {
          saveBtn.addEventListener('click', async () => {
            const name = document.getElementById('new-name').value.trim();
            const tier = parseInt(document.getElementById('new-tier').value);
            const startDate = document.getElementById('new-start-date').value;
            if (!name) { alert('Please enter a name'); return; }
            await db.addContractor({ name, currentTier: tier, startDate });
            this.viewStack = [];
            this.navigate('team');
          });
        }
        break;
    }
  },

  // ═══════════════════════════════════════
  // EVALUATE EVENTS
  // ═══════════════════════════════════════

  async bindEvaluateEvents(taskId) {
    // Load contractors into select
    const select = document.getElementById('eval-contractor');
    const contractors = await db.getAllContractors();
    contractors.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = `${c.name} (Tier ${c.currentTier})`;
      select.appendChild(opt);
    });

    if (this.selectedContractorId) {
      select.value = this.selectedContractorId;
    }

    // Load saved evaluator name
    const savedEvaluator = localStorage.getItem('pn_evaluator_name') || '';
    document.getElementById('eval-evaluator').value = savedEvaluator;

    // Add contractor inline
    document.getElementById('btn-add-contractor-inline').addEventListener('click', () => {
      const name = prompt('Contractor name:');
      if (name && name.trim()) {
        db.addContractor({ name: name.trim(), currentTier: 1, startDate: new Date().toISOString().split('T')[0] })
          .then(id => {
            const opt = document.createElement('option');
            opt.value = id;
            opt.textContent = `${name.trim()} (Tier 1)`;
            select.appendChild(opt);
            select.value = id;
          });
      }
    });

    // GO/NO-GO buttons
    const results = {};
    const task = TASKS[taskId];

    document.querySelectorAll('.eval-go-btn, .eval-nogo-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.index);
        const value = btn.dataset.value;
        results[idx] = value;

        // Update button states
        const parent = btn.closest('.eval-check-item');
        parent.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        parent.classList.remove('result-go', 'result-nogo');
        parent.classList.add(value === 'GO' ? 'result-go' : 'result-nogo');

        // Check if all items are evaluated
        const allDone = Object.keys(results).length === task.goNoGo.length;
        const allGo = allDone && Object.values(results).every(v => v === 'GO');

        const resultBar = document.getElementById('eval-result-bar');
        const resultLabel = document.getElementById('eval-result-label');
        const saveBtn = document.getElementById('btn-save-eval');

        if (allDone) {
          resultBar.style.display = 'flex';
          resultBar.className = 'eval-result-bar ' + (allGo ? 'result-go' : 'result-nogo');
          resultLabel.textContent = allGo ? '✅ RESULT: GO' : '❌ RESULT: NO-GO';
          saveBtn.disabled = false;
        }
      });
    });

    // Save evaluation
    document.getElementById('btn-save-eval').addEventListener('click', async () => {
      const contractorId = parseInt(select.value);
      if (!contractorId) { alert('Please select a contractor'); return; }

      const evaluator = document.getElementById('eval-evaluator').value.trim();
      if (evaluator) localStorage.setItem('pn_evaluator_name', evaluator);

      const allGo = Object.values(results).every(v => v === 'GO');

      const evalDate = document.getElementById('eval-date').value;
      const evalNotes = document.getElementById('eval-notes').value;

      await db.saveEvaluation({
        contractorId,
        taskId,
        result: allGo ? 'GO' : 'NO-GO',
        evaluator,
        date: evalDate,
        notes: evalNotes,
        details: results
      });

      // Notify Mattermost
      const contractor = await db.getContractor(contractorId);
      const task = TASKS[taskId];
      const resultEmoji = allGo ? '✅' : '❌';
      const resultText = allGo ? 'GO' : 'NO-GO';
      const safetyTag = task.safetyCritical ? ' 🛡️ SAFETY-CRITICAL' : '';
      const nogoItems = [];
      if (!allGo) {
        task.goNoGo.forEach((item, i) => {
          if (results[i] === 'NO-GO') nogoItems.push('- ❌ ' + item);
        });
      }

      var logId = await db.saveChecklist({
        type: 'evaluation',
        date: evalDate,
        completed: true,
        sent: false,
        data: {
          taskId: taskId,
          taskTitle: task.title,
          taskTier: task.tier || null,
          contractorId: contractorId,
          contractorName: contractor.name,
          contractorTier: contractor.currentTier,
          result: resultText,
          evaluator: evaluator,
          date: evalDate,
          notes: evalNotes,
          safetyCritical: task.safetyCritical || false,
          criteria: task.goNoGo.map(function(item, i) {
            return { index: i, text: item, result: results[i] || 'NOT-EVALUATED' };
          }),
          nogoItems: nogoItems,
          details: results
        }
      });

      let mmStatus = '';
      try {
        await App.sendLogToMM(logId, null);
        mmStatus = '📨 Notification sent';
      } catch (e) {
        mmStatus = '⚠️ Offline - send from Logs later';
      }

      // Show confirmation
      const saveBtn = document.getElementById('btn-save-eval');
      saveBtn.textContent = '✅ Saved!';
      saveBtn.disabled = true;

      // Flash MM status briefly
      const resultBar = document.getElementById('eval-result-bar');
      const oldText = resultBar.textContent;
      resultBar.querySelector('.eval-result-label').textContent = mmStatus;
      setTimeout(() => {
        resultBar.querySelector('.eval-result-label').textContent = oldText;
        saveBtn.textContent = 'Save Evaluation';
      }, 3000);
    });
  },

  // ═══════════════════════════════════════
  // SEARCH & QUICK REFERENCE
  // ═══════════════════════════════════════

  showSafetyCritical() {
    const safetyTasks = Object.values(TASKS).filter(t => t.safetyCritical);
    const content = document.getElementById('content');
    const title = document.getElementById('header-title');
    title.textContent = 'Safety Critical';

    let html = `<div class="safety-list">
      <div class="safety-warning">⚠️ These tasks have zero-tolerance safety items. A single violation requires full retraining.</div>
    `;
    safetyTasks.forEach(task => {
      html += `
        <button class="task-list-item safety" data-task-id="${task.id}">
          <div class="tli-left">
            <span class="tli-id">${task.id}</span>
            <span class="tli-title">${task.title}</span>
          </div>
          <span class="tli-safety">⚠️</span>
          <span class="tli-arrow">›</span>
        </button>
      `;
    });
    html += '</div>';
    content.innerHTML = html;

    document.querySelectorAll('.task-list-item').forEach(item => {
      item.addEventListener('click', () => {
        this.navigate('task', { taskId: item.dataset.taskId });
      });
    });
  },

  showSearch() {
    const content = document.getElementById('content');
    const title = document.getElementById('header-title');
    title.textContent = 'Search';

    content.innerHTML = `
      <div class="search-container">
        <input type="text" id="search-input" class="search-input" placeholder="Search tasks..." autofocus>
        <div id="search-results" class="search-results"></div>
      </div>
    `;

    document.getElementById('search-input').addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const results = document.getElementById('search-results');

      if (q.length < 2) {
        results.innerHTML = '<p class="search-hint">Type at least 2 characters...</p>';
        return;
      }

      const matches = Object.values(TASKS).filter(t => {
        return t.title.toLowerCase().includes(q)
          || t.id.toLowerCase().includes(q)
          || t.conditions.some(c => c.toLowerCase().includes(q))
          || t.standards.some(s => s.toLowerCase().includes(q))
          || t.goNoGo.some(g => g.toLowerCase().includes(q))
          || t.perfSteps.some(p => {
            if (p.text && p.text.toLowerCase().includes(q)) return true;
            if (p.substeps && p.substeps.some(s => s.toLowerCase().includes(q))) return true;
            return false;
          });
      });

      if (matches.length === 0) {
        results.innerHTML = '<p class="search-hint">No matching tasks found.</p>';
        return;
      }

      let html = '';
      matches.forEach(task => {
        html += `
          <button class="task-list-item" data-task-id="${task.id}">
            <div class="tli-left">
              <span class="tli-id">${task.id}</span>
              <span class="tli-title">${task.title}</span>
            </div>
            ${task.safetyCritical ? '<span class="tli-safety">⚠️</span>' : ''}
            <span class="tli-arrow">›</span>
          </button>
        `;
      });
      results.innerHTML = html;

      results.querySelectorAll('.task-list-item').forEach(item => {
        item.addEventListener('click', () => {
          this.navigate('task', { taskId: item.dataset.taskId });
        });
      });
    });
  }
};

// Boot
window.addEventListener('DOMContentLoaded', () => App.init());
