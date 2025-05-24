// 📁 /api/status.js
// Übersicht & Verfügbarkeit aller GPTs laut mapping.json (inkl. Prompt/YAML-Check)

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET-Anfragen erlaubt.' });
  }

  try {
    const mappingPath = path.join(process.cwd(), 'api/config/mapping.json');
    const deploymentMap = JSON.parse(await fs.readFile(mappingPath, 'utf8'));

    const statusReport = await Promise.all(
      Object.entries(deploymentMap).map(async ([gptKey, config]) => {
        const result = { gpt: gptKey, ...config };

        try {
          const promptPath = path.join(process.cwd(), config.prompt);
          await fs.access(promptPath);
          result.promptStatus = '✅ gefunden';
        } catch {
          result.promptStatus = '❌ fehlt';
        }

        try {
          const yamlPath = path.join(process.cwd(), config.yaml);
          await fs.access(yamlPath);
          result.yamlStatus = '✅ vorhanden';
        } catch {
          result.yamlStatus = '❌ fehlt';
        }

        return result;
      })
    );

    return res.status(200).json({
      updated: new Date().toISOString(),
      gpts: statusReport
    });

  } catch (err) {
    console.error('[STATUS] ❌ Fehler beim Prüfen des GPT-Mappings:', err);
    return res.status(500).json({ error: 'Interner Fehler beim Laden des Status.', details: err.message });
  }
}
