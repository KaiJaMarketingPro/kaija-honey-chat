// 📁 /admin/log-gpt.js
// GPT Call Logger (in JSONL Format) für Debug + Sheet-Sync

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { format } from 'date-fns';

const appendFile = promisify(fs.appendFile);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt' });
  }

  try {
    const { gpt, user, tokens, prompt, status } = req.body;

    const entry = {
      timestamp: new Date().toISOString(),
      gpt,
      user: user || 'anonymous',
      tokens: tokens || 0,
      prompt: prompt?.slice(0, 80) || '-',
      status: status || 'unknown'
    };

    const logDir = path.join(process.cwd(), 'logs');
    const logFile = path.join(logDir, `gpt-usage-${format(new Date(), 'yyyy-MM')}.jsonl`);

    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

    await appendFile(logFile, JSON.stringify(entry) + '\n', 'utf8');

    return res.status(200).json({ message: '✅ GPT Call protokolliert', entry });
  } catch (err) {
    console.error('[Logger Error]', err);
    return res.status(500).json({ error: 'Fehler beim Loggen', details: err.message });
  }
}
