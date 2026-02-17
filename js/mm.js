var MM_HOOKS = {
  evaluation: 'https://chat.firewood.ltd/hooks/ybhthptcy786icsz3h3ddbmieh',
  daily: 'https://chat.firewood.ltd/hooks/55wsqxj3iff8z8tmtazp1x9jne',
  weekly: 'https://chat.firewood.ltd/hooks/55wsqxj3iff8z8tmtazp1x9jne'
};

App.buildEvalMessage = function(log) {
  var d = log.data || {};
  var parts = [];
  var resultEmoji = d.result === 'GO' ? '✅' : '❌';
  var safetyTag = d.safetyCritical ? ' 🛡️ SAFETY-CRITICAL' : '';
  parts.push(resultEmoji + ' **' + d.result + ' -- ' + d.taskId + ': ' + d.taskTitle + '**' + safetyTag);
  parts.push('**Contractor:** ' + d.contractorName + '  **Evaluator:** ' + (d.evaluator || 'N/A') + '  **Date:** ' + d.date);
  if (d.nogoItems && d.nogoItems.length > 0) {
    parts.push('**NO-GO Items:**');
    d.nogoItems.forEach(function(item) { parts.push(item); });
  }
  if (d.notes) {
    parts.push('> ' + d.notes);
  }
  return parts.join('\n');
};

App.buildDailyMessage = function(log) {
  var d = log.data || {};
  var parts = [];
  parts.push('**Daily Operations Log -- ' + (d.header_date || log.date || 'today') + '**');
  parts.push('**Lead:** ' + (d.header_crew_lead || '?') + '  **Crew:** ' + (d.header_crew_member || '?'));
  if (d.production_cords_split) {
    parts.push('**Production:** ' + d.production_cords_split + ' cords / ' + (d.production_pallets_completed || '?') + ' pallets');
  }
  if (d.production_goal_met === 'yes') {
    parts.push('Goal: Hit');
  } else if (d.production_goal_met === 'no') {
    parts.push('Goal: Missed -- ' + (d.production_goal_met_notes || ''));
  }
  if (d.safety_end_near_misses === 'yes') {
    parts.push('**NEAR MISS:** ' + (d.safety_end_near_misses_notes || 'details pending'));
  }
  if (d.safety_end_injuries === 'yes') {
    parts.push('**INJURY:** ' + (d.safety_end_injuries_notes || 'details pending'));
  }
  if (d.equip_end_equip_issues) {
    parts.push('**Equipment Issues:** ' + d.equip_end_equip_issues);
  }
  if (d.tomorrow_notes_tomorrow) {
    parts.push('> ' + d.tomorrow_notes_tomorrow);
  }
  return parts.join('\n');
};

App.buildWeeklyMessage = function(log) {
  var d = log.data || {};
  var parts = [];
  parts.push('**Weekly Checklist -- ' + (d.week_info_week_start || '?') + ' to ' + (d.week_info_week_end || '?') + '**');
  parts.push('**Completed by:** ' + (d.week_info_completed_by || '?'));
  if (d.production_review_total_cords) {
    parts.push('**Production:** ' + d.production_review_total_cords + ' cords / ' + (d.production_review_total_pallets || '?') + ' pallets / ' + (d.production_review_days_worked || '?') + ' days');
  }
  if (d.quality_weekly_mc_avg) {
    parts.push('**MC Average:** ' + d.quality_weekly_mc_avg + '%');
  }
  if (d.inventory_raw_supply) {
    parts.push('**Raw Supply:** ' + d.inventory_raw_supply);
  }
  if (d.summary_wins) {
    parts.push('**Wins:** ' + d.summary_wins);
  }
  if (d.summary_challenges) {
    parts.push('**Challenges:** ' + d.summary_challenges);
  }
  return parts.join('\n');
};

App.buildMessage = function(log) {
  if (log.type === 'evaluation') return App.buildEvalMessage(log);
  if (log.type === 'daily') return App.buildDailyMessage(log);
  if (log.type === 'weekly') return App.buildWeeklyMessage(log);
  return '';
};

App.sendLogToMM = async function(logId, btn) {
  var log = await db.getChecklist(logId);
  if (!log) return;
  var hookUrl = MM_HOOKS[log.type] || MM_HOOKS.daily;
  var mmText = App.buildMessage(log);
  if (!mmText) return;
  if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
  try {
    await fetch(hookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: mmText })
    });
    log.sent = true;
    log.sentAt = new Date().toISOString();
    await db._put('checklists', log);
    if (btn) { btn.textContent = 'Sent ✓'; btn.classList.add('log-sent-done'); }
  } catch (e) {
    if (btn) { btn.textContent = 'Failed - Retry'; btn.disabled = false; }
  }
};
