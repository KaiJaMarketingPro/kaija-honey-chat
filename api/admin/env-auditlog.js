// 📁 /api/admin/env-auditlog.js
// Schreibt ENV-Audit (Name + Hash) täglich in JSON-File zur Kontrolle

import fs from 'fs/promises';
import crypto from 'crypto';

export default async function handler(req, res) {
  const envKeys = [
    'AZURE_OPENAI_KEY', 'AZURE_OPENAI_ENDPOINT', 'AZURE_OPENAI_VERSION',
    'DEPLOYMENT_HONEY', 'DEPLOYMENT_GABRIELA', 'DEPLOYMENT_MAERKI',
    'MAKE_WEBHOOK_URL', 'STRIPE_SECRET_KEY', 'ADMIN_SECRET_TOKEN',
    'PROJECT_VERSION', 'DSGVO_OPTIN_REQUIRED'
  ];

  const audit = {};
  const now = new Date().toISOString();

  try {
    for (const key of envKeys) {
      const value = process.env[key] || '';
      const hash = crypto.createHash('sha256').update(value).digest('hex');
      audit[key] = hash;
    }

    const path = `./logs/env-audit-${now.slice(0, 10)}.json`;
    await fs.writeFile(path, JSON.stringify({ timestamp: now, env: audit }, null, 2));

    res.status(200).json({ message: '✅ ENV Audit gespeichert', file: path });
  } catch (err) {
    console.error('❌ ENV Audit fehlgeschlagen', err);
    res.status(500).json({ error: 'Fehler beim Audit', details: err.message });
  }
}
