// 📁 /api/status.js
// Status Endpoint für DSGVO, Deployment & Monitoring 🦄

export default async function handler(req, res) {
  const version = process.env.PROJECT_VERSION || 'unknown';
  const dsgvoOptin = process.env.DSGVO_OPTIN_REQUIRED === 'true';
  const azureVersion = process.env.AZURE_OPENAI_VERSION || 'undefined';
  const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT || 'not-set';
  const now = new Date().toISOString();

  return res.status(200).json({
    status: 'ok',
    gpt_proxy_active: true,
    version,
    dsgvo_optin_required: dsgvoOptin,
    azure_region: azureEndpoint.includes('switzerlandnorth') ? 'Switzerland North 🇨🇭' : 'UNKNOWN',
    azure_model_version: azureVersion,
    timestamp: now
  });
}
