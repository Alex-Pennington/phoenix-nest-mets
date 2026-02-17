var MM_HOOKS = {
  evaluation: 'https://chat.firewood.ltd/hooks/ybhthptcy786icsz3h3ddbmieh',
  daily: 'https://chat.firewood.ltd/hooks/55wsqxj3iff8z8tmtazp1x9jne',
  weekly: 'https://chat.firewood.ltd/hooks/55wsqxj3iff8z8tmtazp1x9jne'
};

App.buildMessage = function(log) {
  var payload = {
    _schema: 'phoenix-nest-mets-v1',
    _type: log.type,
    _id: log.id,
    _date: log.date,
    _completed: log.completed || false,
    _completedAt: log.completedAt || null,
    _savedAt: log.savedAt || null,
    data: log.data || {}
  };
  return '```json\n' + JSON.stringify(payload, null, 2) + '\n```';
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
      mode: 'no-cors',
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
