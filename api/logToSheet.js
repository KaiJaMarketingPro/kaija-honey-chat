// 📁 /api/logToSheet.js
// Logging von GPT Calls direkt an Google Sheet via googleapis

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt.' });
  }

  const { gpt, user, tokens, prompt, status } = req.body;

  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = process.env.GOOGLE_SHEET_ID_ACTIVITY;

  const now = new Date().toISOString();

  const values = [
    [now, gpt, user, tokens || 0, prompt?.slice(0, 80) || '-', status || 'unknown']
  ];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Logs!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values }
    });

    return res.status(200).json({ message: '✅ Eintrag protokolliert', values });
  } catch (err) {
    console.error('[Google Sheets API Error]', err);
    return res.status(500).json({ error: 'Fehler beim Google Sheets Logging', details: err.message });
  }
}
