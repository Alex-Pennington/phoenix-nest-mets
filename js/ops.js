App.renderOps = function() {
  var today = new Date().toISOString().split('T')[0];
  return '<div class="ops-view">' +
    '<div class="ops-hero">' +
      '<div class="ops-hero-icon">&#9881;</div>' +
      '<h2>Daily Operations</h2>' +
      '<p class="ops-date">Today: ' + today + '</p>' +
    '</div>' +
    '<div class="ops-grid">' +
      '<button class="ops-card ops-daily" data-action="daily">' +
        '<span class="ops-card-icon">&#9728;&#65039;</span>' +
        '<span class="ops-card-label">Daily Log</span>' +
        '<span class="ops-card-sub">Start / End of Shift</span>' +
      '</button>' +
      '<button class="ops-card ops-weekly" data-action="weekly">' +
        '<span class="ops-card-icon">&#128197;</span>' +
        '<span class="ops-card-label">Weekly Checklist</span>' +
        '<span class="ops-card-sub">Friday / Saturday</span>' +
      '</button>' +
    '</div>' +
    '<div id="ops-resume"></div>' +
  '</div>';
};

App.checkOpsResume = async function() {
  var today = new Date().toISOString().split('T')[0];
  var dailyLogs = await db.getChecklists('daily');
  var todayLog = dailyLogs.find(function(l) { return l.date === today && !l.completed; });
  var el = document.getElementById('ops-resume');
  if (!el) return;
  if (todayLog) {
    el.innerHTML = '<button class="ops-resume-btn" data-id="' + todayLog.id + '">' +
      '<span class="ops-resume-icon">&#9654;&#65039;</span> Resume today\'s log (' + (todayLog.data.crew_lead || 'in progress') + ')' +
    '</button>';
    el.querySelector('.ops-resume-btn').addEventListener('click', function() {
      App.navigate('checklist-fill', { checklistType: 'daily', resumeId: todayLog.id });
    });
  }
};

App.renderChecklistForm = function(type, resumeData) {
  var def = CHECKLISTS[type];
  if (!def) return '<p>Checklist not found</p>';
  var today = new Date().toISOString().split('T')[0];
  var data = resumeData || {};
  var html = '<div class="cl-form" data-type="' + type + '">';
  html += '<div class="cl-form-header">';
  html += '<h2>' + def.title + '</h2>';
  if (def.subtitle) html += '<p class="cl-subtitle">' + def.subtitle + '</p>';
  html += '</div>';

  var phases = {};
  def.sections.forEach(function(sec) {
    var p = sec.phase || 'all';
    if (!phases[p]) phases[p] = [];
    phases[p].push(sec);
  });

  if (type === 'daily') {
    html += '<div class="cl-phase-tabs">';
    html += '<button class="cl-phase-tab active" data-phase="start">Start of Shift</button>';
    html += '<button class="cl-phase-tab" data-phase="end">End of Shift</button>';
    html += '</div>';
    html += App.renderSections(phases['start'] || [], data, 'start');
    html += App.renderSections(phases['end'] || [], data, 'end');
  } else {
    html += App.renderSections(def.sections, data, 'all');
  }

  html += '<div class="cl-form-actions">';
  if (type === 'daily') {
    html += '<button class="btn-cl-save" id="btn-cl-save" data-mode="partial">Save Progress</button>';
  }
  html += '<button class="btn-cl-submit" id="btn-cl-submit">Submit Complete</button>';
  html += '</div>';
  html += '</div>';
  return html;
};

App.renderSections = function(sections, data, phase) {
  var html = '<div class="cl-sections" data-phase="' + phase + '"' + (phase === 'end' ? ' style="display:none"' : '') + '>';
  sections.forEach(function(sec) {
    html += '<div class="cl-section">';
    html += '<div class="cl-section-header">' + sec.title + '</div>';
    html += '<div class="cl-section-fields">';
    sec.fields.forEach(function(field) {
      html += App.renderField(field, data, sec.id);
    });
    html += '</div></div>';
  });
  html += '</div>';
  return html;
};

App.renderField = function(field, data, sectionId) {
  var fid = sectionId + '_' + field.id;
  var val = data[fid] || '';
  var html = '';
  switch (field.type) {
    case 'date':
      html = '<div class="cl-field">' +
        '<label>' + field.label + '</label>' +
        '<input type="date" class="cl-input" data-fid="' + fid + '" value="' + (val || new Date().toISOString().split('T')[0]) + '">' +
      '</div>';
      break;
    case 'text':
      html = '<div class="cl-field">' +
        '<label>' + field.label + '</label>' +
        '<input type="text" class="cl-input" data-fid="' + fid + '" value="' + (val || '') + '" placeholder="' + field.label + '">' +
      '</div>';
      break;
    case 'number':
      html = '<div class="cl-field">' +
        '<label>' + field.label + '</label>' +
        '<input type="number" class="cl-input cl-input-num" data-fid="' + fid + '" value="' + (val || '') + '" inputmode="numeric">' +
      '</div>';
      break;
    case 'textarea':
      html = '<div class="cl-field cl-field-wide">' +
        '<label>' + field.label + '</label>' +
        '<textarea class="cl-input cl-textarea" data-fid="' + fid + '" rows="2">' + (val || '') + '</textarea>' +
      '</div>';
      break;
    case 'check':
      var checked = val === 'yes' ? ' checked' : '';
      html = '<div class="cl-field cl-field-check">' +
        '<label class="cl-check-label">' +
          '<input type="checkbox" class="cl-checkbox" data-fid="' + fid + '"' + checked + '>' +
          '<span class="cl-check-text">' + field.label + '</span>' +
        '</label>';
      if (field.hasHours) {
        html += '<input type="text" class="cl-input cl-input-sm" data-fid="' + fid + '_hrs" value="' + (data[fid + '_hrs'] || '') + '" placeholder="Hours">';
      }
      if (field.hasNotes) {
        html += '<input type="text" class="cl-input cl-input-sm" data-fid="' + fid + '_notes" value="' + (data[fid + '_notes'] || '') + '" placeholder="Notes">';
      }
      html += '</div>';
      break;
    case 'yesno':
    case 'yesno_reverse':
      var yVal = val || '';
      html = '<div class="cl-field cl-field-yesno">' +
        '<label>' + field.label + '</label>' +
        '<div class="cl-yesno-btns">' +
          '<button class="cl-yn-btn cl-yn-yes' + (yVal === 'yes' ? ' selected' : '') + '" data-fid="' + fid + '" data-val="yes">Yes</button>' +
          '<button class="cl-yn-btn cl-yn-no' + (yVal === 'no' ? ' selected' : '') + '" data-fid="' + fid + '" data-val="no">No</button>' +
        '</div>';
      if (field.hasNotes) {
        html += '<input type="text" class="cl-input cl-input-sm" data-fid="' + fid + '_notes" value="' + (data[fid + '_notes'] || '') + '" placeholder="Details...">';
      }
      html += '</div>';
      break;
    case 'ppe_row':
      html = '<div class="cl-field cl-field-ppe">' +
        '<label class="cl-ppe-label">' + field.label + '</label>' +
        '<div class="cl-ppe-items">';
      field.items.forEach(function(item) {
        var ppeFid = fid + '_' + item.toLowerCase();
        var ppeCk = data[ppeFid] === 'yes' ? ' checked' : '';
        html += '<label class="cl-ppe-item">' +
          '<input type="checkbox" class="cl-checkbox" data-fid="' + ppeFid + '"' + ppeCk + '>' +
          '<span>' + item + '</span>' +
        '</label>';
      });
      html += '</div></div>';
      break;
    case 'select':
      html = '<div class="cl-field">' +
        '<label>' + field.label + '</label>' +
        '<select class="cl-input cl-select" data-fid="' + fid + '">' +
        '<option value="">-- Select --</option>';
      field.options.forEach(function(opt) {
        html += '<option value="' + opt + '"' + (val === opt ? ' selected' : '') + '>' + opt + '</option>';
      });
      html += '</select></div>';
      break;
  }
  return html;
};

App.bindChecklistEvents = function(type, resumeId) {
  // Phase tabs (daily only)
  document.querySelectorAll('.cl-phase-tab').forEach(function(tab) {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.cl-phase-tab').forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      var phase = tab.dataset.phase;
      document.querySelectorAll('.cl-sections').forEach(function(s) {
        s.style.display = s.dataset.phase === phase ? '' : 'none';
      });
    });
  });

  // Yes/No buttons
  document.querySelectorAll('.cl-yn-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var fid = btn.dataset.fid;
      var val = btn.dataset.val;
      document.querySelectorAll('.cl-yn-btn[data-fid="' + fid + '"]').forEach(function(b) { b.classList.remove('selected'); });
      btn.classList.add('selected');
      btn._selectedVal = val;
    });
  });

  // Save progress (daily)
  var saveBtn = document.getElementById('btn-cl-save');
  if (saveBtn) {
    saveBtn.addEventListener('click', async function() {
      var formData = App.collectFormData();
      if (resumeId) {
        var existing = await db.getChecklist(resumeId);
        existing.data = formData;
        existing.savedAt = new Date().toISOString();
        await db._put('checklists', existing);
        saveBtn.textContent = 'Saved!';
      } else {
        var id = await db.saveChecklist({
          type: type,
          date: formData.header_date || new Date().toISOString().split('T')[0],
          completed: false,
          data: formData
        });
        App._currentResumeId = id;
        resumeId = id;
        saveBtn.textContent = 'Saved!';
      }
      setTimeout(function() { saveBtn.textContent = 'Save Progress'; }, 2000);
    });
  }

  // Submit complete
  var submitBtn = document.getElementById('btn-cl-submit');
  if (submitBtn) {
    submitBtn.addEventListener('click', async function() {
      var formData = App.collectFormData();
      if (resumeId) {
        var existing = await db.getChecklist(resumeId);
        existing.data = formData;
        existing.completed = true;
        existing.completedAt = new Date().toISOString();
        await db._put('checklists', existing);
      } else {
        await db.saveChecklist({
          type: type,
          date: formData.header_date || formData.week_info_week_start || new Date().toISOString().split('T')[0],
          completed: true,
          completedAt: new Date().toISOString(),
          data: formData
        });
      }
      App.postChecklistToMM(type, formData);
      submitBtn.textContent = 'Submitted!';
      submitBtn.disabled = true;
      setTimeout(function() { App.navigate('ops'); }, 1500);
    });
  }
};

App.collectFormData = function() {
  var data = {};
  document.querySelectorAll('.cl-input, .cl-textarea, .cl-select').forEach(function(el) {
    var fid = el.dataset.fid;
    if (fid) data[fid] = el.value;
  });
  document.querySelectorAll('.cl-checkbox').forEach(function(el) {
    var fid = el.dataset.fid;
    if (fid) data[fid] = el.checked ? 'yes' : '';
  });
  document.querySelectorAll('.cl-yn-btn.selected').forEach(function(el) {
    var fid = el.dataset.fid;
    if (fid) data[fid] = el.dataset.val;
  });
  return data;
};

App.postChecklistToMM = async function(type, data) {
  var parts = [];
  if (type === 'daily') {
    parts.push('**Daily Operations Log -- ' + (data.header_date || 'today') + '**');
    parts.push('**Lead:** ' + (data.header_crew_lead || '?') + '  **Crew:** ' + (data.header_crew_member || '?'));
    if (data.production_cords_split) {
      parts.push('**Production:** ' + data.production_cords_split + ' cords / ' + (data.production_pallets_completed || '?') + ' pallets');
    }
    if (data.production_goal_met === 'yes') {
      parts.push('Goal: Hit');
    } else if (data.production_goal_met === 'no') {
      parts.push('Goal: Missed -- ' + (data.production_goal_met_notes || ''));
    }
    if (data.safety_end_near_misses === 'yes') {
      parts.push('**NEAR MISS:** ' + (data.safety_end_near_misses_notes || 'details pending'));
    }
    if (data.safety_end_injuries === 'yes') {
      parts.push('**INJURY:** ' + (data.safety_end_injuries_notes || 'details pending'));
    }
    if (data.equip_end_equip_issues) {
      parts.push('**Equipment Issues:** ' + data.equip_end_equip_issues);
    }
    if (data.tomorrow_notes_tomorrow) {
      parts.push('> ' + data.tomorrow_notes_tomorrow);
    }
  } else {
    parts.push('**Weekly Checklist -- ' + (data.week_info_week_start || '?') + ' to ' + (data.week_info_week_end || '?') + '**');
    parts.push('**Completed by:** ' + (data.week_info_completed_by || '?'));
    if (data.production_review_total_cords) {
      parts.push('**Production:** ' + data.production_review_total_cords + ' cords / ' + (data.production_review_total_pallets || '?') + ' pallets / ' + (data.production_review_days_worked || '?') + ' days');
    }
    if (data.quality_weekly_mc_avg) {
      parts.push('**MC Average:** ' + data.quality_weekly_mc_avg + '%');
    }
    if (data.inventory_raw_supply) {
      parts.push('**Raw Supply:** ' + data.inventory_raw_supply);
    }
    if (data.summary_wins) {
      parts.push('**Wins:** ' + data.summary_wins);
    }
    if (data.summary_challenges) {
      parts.push('**Challenges:** ' + data.summary_challenges);
    }
  }
  var mmText = parts.join('\n');
  try {
    await fetch('https://chat.firewood.ltd/hooks/55wsqxj3iff8z8tmtazp1x9jne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: mmText })
    });
  } catch (e) {}
};

App.renderChecklistView = async function(logId) {
  var log = await db.getChecklist(logId);
  if (!log) return '<p>Log not found</p>';
  var def = CHECKLISTS[log.type];
  if (!def) return '<p>Unknown checklist type</p>';
  var data = log.data || {};
  var html = '<div class="cl-view">';
  html += '<div class="cl-view-header">';
  html += '<h2>' + def.title + '</h2>';
  html += '<p class="cl-view-date">' + (log.date || '?') + (log.completed ? ' -- Completed' : ' -- In Progress') + '</p>';
  html += '</div>';
  def.sections.forEach(function(sec) {
    html += '<div class="cl-view-section">';
    html += '<h3>' + sec.title + '</h3>';
    sec.fields.forEach(function(field) {
      var fid = sec.id + '_' + field.id;
      var val = data[fid] || '';
      if (field.type === 'ppe_row') {
        html += '<div class="cl-view-row"><strong>' + field.label + ':</strong> ';
        field.items.forEach(function(item) {
          var ppeFid = fid + '_' + item.toLowerCase();
          html += (data[ppeFid] === 'yes' ? '&#9989; ' : '&#9744; ') + item + ' ';
        });
        html += '</div>';
      } else if (val) {
        var display = val === 'yes' ? 'Yes' : val === 'no' ? 'No' : val;
        html += '<div class="cl-view-row"><strong>' + field.label + ':</strong> ' + display;
        if (field.hasHours && data[fid + '_hrs']) html += ' (Hrs: ' + data[fid + '_hrs'] + ')';
        if (field.hasNotes && data[fid + '_notes']) html += ' -- ' + data[fid + '_notes'];
        html += '</div>';
      }
    });
    html += '</div>';
  });
  html += '</div>';
  return html;
};
