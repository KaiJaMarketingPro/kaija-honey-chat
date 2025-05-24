// 📁 /api/crm-export.js – Generiert JSONL-CRM-Export aus Memory + Logs
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const user = req.headers['x-user-id'] || 'default';

  try {
    const memoryPath = path.join(process.cwd(), 'memory', `${user}.json`);
    const logPath = path.join(process.cwd(), 'logs/test-log.json`);
    const crmFilePath = path.join(process.cwd(), 'crm', `${user}-export.jsonl`);
    await fs.mkdir(path.dirname(crmFilePath), { recursive: true });

    let memory = [];
    try {
      const rawMemory = await fs.readFile(memoryPath, 'utf8');
      memory = JSON.parse(rawMemory);
    } catch {}

    let logs = [];
    try {
      const rawLogs = JSON.parse(await fs.readFile(logPath, 'utf8'));
      logs = rawLogs.filter(l => l.gpt && l.prompt && l.output && l.timestamp).map(l => [
        { role: 'user', content: l.prompt, meta: { gpt: l.gpt, ts: l.timestamp } },
        { role: 'assistant', content: l.output }
      ]).flat();
    } catch {}

    const combined = [...memory, ...logs].slice(0, 50);
    const jsonl = combined.map(e => JSON.stringify(e)).join('\n');
    await fs.writeFile(crmFilePath, jsonl);

    return res.status(200).json({ file: `/crm/${user}-export.jsonl`, count: combined.length });
  } catch (err) {
    console.error('[CRM Export] Fehler:', err);
    return res.status(500).json({ error: 'Fehler beim Erstellen des CRM-Exports', details: err.message });
  }
}
