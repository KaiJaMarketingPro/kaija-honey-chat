// 📁 /api/admin/logs.js

import { validateAdminAuth } from './middleware.js';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  // Auth prüfen
  const authError = validateAdminAuth(req, res);
  if (authError) return authError;

  // Nur GET erlaubt
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET-Anfragen erlaubt.' });
  }

  try {
    const logsPath = path.join(process.cwd(), 'logs');
    const files = await fs.readdir(logsPath);

    const result = await Promise.all(
      files.map(async file => {
        const content = await fs.readFile(path.join(logsPath, file), 'utf8');
        return { file, content: JSON.parse(content) };
      })
    );

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: 'Fehler beim Lesen der Logs.', details: e.message });
  }
}
