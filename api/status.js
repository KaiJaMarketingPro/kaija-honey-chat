// 📁 /api/status.js
// KaiJa GPT Systemstatus – DSGVO, Deployment, Azure Mapping, CI/CD 🦄

import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Nur GET erlaubt' });
  }

  const now = new Date().toISOString();
  const version = process.env.PROJECT_VERSION || 'unknown';
  const dsgvoOptin = process.env.DSGVO_OPTIN_REQUIRED === 'true';
  const azureVersion = process.env.AZURE_OPENAI_VERSION || 'undefined';
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT || 'not-set';
  const region = azureEndpoint.includes('switzerlandnorth') ? 'Switzerland North 🇨🇭' : 'UNKNOWN';

  try {
    const summaryPath = path.join(process.cwd(), 'api/config/status-summary.json');
    const summaryRaw = await fs.readFile(summaryPath, 'utf8');
    const summary = JSON.parse(summaryRaw);

    return res.status(200).json({
      status: 'ok',
      gpt_proxy_active: true,
      version,
      timestamp: now,
      region,
      azure_model_version: azureVersion,
      dsgvo_optin_required: dsgvoOptin,
      deployments_synced: Object.keys(summary.deployments || {}).length || 0,
      fallback_active: Object.values(summary.deployments || {}).some(d => d.fallback === true),
      summary: {
        source: 'status-summary.json',
        model: summary.model,
        region: summary.region,
        optin_enforced: summary.optin_enforced,
        log_enabled: summary.log_enabled,
        ds_gvo_compliant: summary.ds_gvo_compliant,
        azure_verified: summary.azure_verified,
        deployments: summary.deployments
      }
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      error: 'Fehler beim Laden der status-summary.json',
      message: err.message,
      timestamp: now
    });
  }
}
