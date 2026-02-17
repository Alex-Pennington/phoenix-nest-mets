App.renderLogs = async function() {
  var dailyLogs = await db.getChecklists('daily');
  var weeklyLogs = await db.getChecklists('weekly');
  var evalLogs = await db.getChecklists('evaluation');
  var html = '<div class="logs-view">';

  html += '<h3 class="logs-section-title">MET Evaluations</h3>';
  if (evalLogs.length === 0) {
    html += '<p class="logs-empty">No evaluations logged yet</p>';
  } else {
    evalLogs.slice(0, 15).forEach(function(log) {
      var d = log.data || {};
      var icon = d.result === 'GO' ? '✅' : '❌';
      var sentClass = log.sent ? 'log-sent' : 'log-unsent';
      html += '<div class="log-row ' + sentClass + '">';
      html += '<button class="log-entry log-entry-eval" data-id="' + log.id + '">';
      html += '<div class="log-entry-date">' + icon + ' ' + (d.taskId || '?') + ' -- ' + (d.date || '?') + '</div>';
      html += '<div class="log-entry-detail">' + (d.contractorName || '?') + ' | ' + d.result + (d.safetyCritical ? ' | SAFETY' : '') + '</div>';
      html += '</button>';
      html += '<button class="log-send-btn' + (log.sent ? ' log-sent-done' : '') + '" data-id="' + log.id + '">' + (log.sent ? 'Sent ✓' : 'Send') + '</button>';
      html += '</div>';
    });
  }

  html += '<h3 class="logs-section-title">Daily Logs</h3>';
  if (dailyLogs.length === 0) {
    html += '<p class="logs-empty">No daily logs yet</p>';
  } else {
    dailyLogs.slice(0, 15).forEach(function(log) {
      var d = log.data || {};
      var status = log.completed ? 'Done' : 'In progress';
      var sentClass = log.sent ? 'log-sent' : (log.completed ? 'log-unsent' : '');
      html += '<div class="log-row ' + sentClass + '">';
      html += '<button class="log-entry" data-id="' + log.id + '">';
      html += '<div class="log-entry-date">' + (log.date || '?') + '</div>';
      html += '<div class="log-entry-detail">Lead: ' + (d.header_crew_lead || '?') + ' | ' + (d.production_cords_split ? d.production_cords_split + ' cords' : status) + '</div>';
      html += '</button>';
      if (log.completed) {
        html += '<button class="log-send-btn' + (log.sent ? ' log-sent-done' : '') + '" data-id="' + log.id + '">' + (log.sent ? 'Sent ✓' : 'Send') + '</button>';
      }
      html += '</div>';
    });
  }

  html += '<h3 class="logs-section-title">Weekly Checklists</h3>';
  if (weeklyLogs.length === 0) {
    html += '<p class="logs-empty">No weekly checklists yet</p>';
  } else {
    weeklyLogs.slice(0, 10).forEach(function(log) {
      var d = log.data || {};
      var status = log.completed ? 'Done' : 'In progress';
      var sentClass = log.sent ? 'log-sent' : (log.completed ? 'log-unsent' : '');
      html += '<div class="log-row ' + sentClass + '">';
      html += '<button class="log-entry log-entry-weekly" data-id="' + log.id + '">';
      html += '<div class="log-entry-date">' + (log.date || '?') + '</div>';
      html += '<div class="log-entry-detail">' + (d.week_info_completed_by || '?') + ' | ' + (d.production_review_total_cords ? d.production_review_total_cords + ' cords' : status) + '</div>';
      html += '</button>';
      if (log.completed) {
        html += '<button class="log-send-btn' + (log.sent ? ' log-sent-done' : '') + '" data-id="' + log.id + '">' + (log.sent ? 'Sent ✓' : 'Send') + '</button>';
      }
      html += '</div>';
    });
  }
  html += '</div>';
  return html;
};

App.bindLogsEvents = function() {
  document.querySelectorAll('.log-entry').forEach(function(entry) {
    entry.addEventListener('click', function() {
      var id = parseInt(entry.dataset.id);
      App.navigate('checklist-view', { logId: id });
    });
  });
  document.querySelectorAll('.log-send-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var id = parseInt(btn.dataset.id);
      App.sendLogToMM(id, btn);
    });
  });
};
