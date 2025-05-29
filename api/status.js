// 📁 /api/status.js
// KaiJa GPT Status Overview 🧠
// Prüft Mapping, Prompt & YAML-Verfügbarkeit für alle GPTs

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
        const result = {
          gpt: gptKey,
          deployment: config.deployment,
          cluster: config.cluster || 'n/a',
          temperature: config.temperature ?? 0.5,
          max_tokens: config.max_tokens ?? 1200
        };

        // Check Prompt File
        try {
          const promptPath = path.join(process.cwd(), config.prompt);
          await fs.access(promptPath);
          result.prompt = '✅ vorhanden';
        } catch {
          result.prompt = '❌ fehlt';
        }

        // Check YAML File (optional)
        if (config.yaml) {
          try {
            const yamlPath = path.join(process.cwd(), config.yaml);
            await fs.access(yamlPath);
            result.yaml = '✅ vorhanden';
          } catch {
            result.yaml = '❌ fehlt';
          }
        } else {
          result.yaml = '⚠️ nicht definiert';
        }

        return result;
      })
    );

    return res.status(200).json({
      status: '🟢 OK',
      updated: new Date().toISOString(),
      count: statusReport.length,
      gpts: statusReport
    });

  } catch (err) {
    console.error('[STATUS] ❌ Fehler beim Status-Check:', err);
    return res.status(500).json({
      status: '🔴 Fehler',
      error: 'Interner Fehler beim Laden des Status.',
      details: err.message
    });
  }
}
