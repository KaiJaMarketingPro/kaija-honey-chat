// 📁 /api/crm-export.js – Optimiert: JSONL, CSV, MD + CRM Sync Ready
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const user = req.headers['x-user-id'] || 'default';
  const format = new URL(req.url, 'http://localhost').searchParams.get('format') || 'jsonl';

  try {
    const memoryPath = path.join(process.cwd(), 'memory', `${user}.json`);
    const logPath = path.join(process.cwd(), 'logs/test-log.json`);
    const outDir = path.join(process.cwd(), 'crm');
    await fs.mkdir(outDir, { recursive: true });

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

    // 📤 CSV
    if (format === 'csv') {
      const csv = combined.map(e => `"${e.role}","${(e.content || '').replace(/"/g, '""')}"`).join('\n');
      const csvOutput = `role,content\n${csv}`;
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="${user}-crm.csv"`);
      return res.send(csvOutput);
    }

    // 📤 Markdown
    if (format === 'md') {
      const md = combined.map(e => `**${e.role.toUpperCase()}**\n\n${e.content}\n`).join('\n---\n');
      res.setHeader('Content-Type', 'text/markdown');
      res.setHeader('Content-Disposition', `attachment; filename="${user}-crm.md"`);
      return res.send(md);
    }

    // 📤 JSONL (Standard)
    const jsonl = combined.map(e => JSON.stringify(e)).join('\n');
    const jsonlPath = path.join(outDir, `${user}-export.jsonl`);
    await fs.writeFile(jsonlPath, jsonl);

    // ✅ CRM-Hook vorbereiten
    // Du kannst dies nun per make.com nutzen, z. B. um:
    // • den Export automatisch in Notion, Brevo, Google Sheets zu schreiben
    // • Follow-up-Logiken (Reminder, Tagging, Label) zu automatisieren
    const webhookUrl = process.env.CRM_SYNC_URL;
    const token = process.env.CRM_SYNC_TOKEN;
    console.log(`[Brevo Sync] CRM-Export für ${user} bereit: ${jsonlPath}`);
    console.log(`[CRM] Optional: send POST an ${webhookUrl} mit Token '${token}'`);

    return res.status(200).json({ file: `/crm/${user}-export.jsonl`, count: combined.length });
  } catch (err) {
    console.error('[CRM Export] Fehler:', err);
    return res.status(500).json({ error: 'Fehler beim CRM-Export', details: err.message });
  }
}
