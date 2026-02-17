App.renderLogs = async function() {
  var dailyLogs = await db.getChecklists('daily');
  var weeklyLogs = await db.getChecklists('weekly');
  var html = '<div class="logs-view">';
  html += '<h3 class="logs-section-title">Recent Daily Logs</h3>';
  if (dailyLogs.length === 0) {
    html += '<p class="logs-empty">No daily logs yet</p>';
  } else {
    dailyLogs.slice(0, 15).forEach(function(log) {
      var d = log.data || {};
      var status = log.completed ? 'Done' : 'In progress';
      html += '<button class="log-entry" data-id="' + log.id + '">';
      html += '<div class="log-entry-date">' + (log.date || '?') + '</div>';
      html += '<div class="log-entry-detail">Lead: ' + (d.header_crew_lead || '?') + ' | ' + (d.production_cords_split ? d.production_cords_split + ' cords' : status) + '</div>';
      html += '</button>';
    });
  }
  html += '<h3 class="logs-section-title">Recent Weekly Checklists</h3>';
  if (weeklyLogs.length === 0) {
    html += '<p class="logs-empty">No weekly checklists yet</p>';
  } else {
    weeklyLogs.slice(0, 10).forEach(function(log) {
      var d = log.data || {};
      var status = log.completed ? 'Done' : 'In progress';
      html += '<button class="log-entry log-entry-weekly" data-id="' + log.id + '">';
      html += '<div class="log-entry-date">' + (log.date || '?') + '</div>';
      html += '<div class="log-entry-detail">' + (d.week_info_completed_by || '?') + ' | ' + (d.production_review_total_cords ? d.production_review_total_cords + ' cords' : status) + '</div>';
      html += '</button>';
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
};
