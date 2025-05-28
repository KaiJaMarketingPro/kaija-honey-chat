// access-check.js – DSGVO-konforme iFrame-Freischaltung

export async function checkAccess(email) {
  const SHEET_API_URL = 'https://your-make-webhook-url.com'; // Ersetze durch deine Make- oder Google Apps Script URL

  try {
    const response = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();
    return data.access_granted === true;
  } catch (error) {
    console.error('Access Check Error:', error);
    return false;
  }
}

// Beispiel-Integration (test.html oder onboarding.html)
export async function handleAccess(email, iframeId) {
  const accessGranted = await checkAccess(email);
  const iframe = document.getElementById(iframeId);
  const msg = document.getElementById("access-message");

  if (accessGranted) {
    iframe.style.display = 'block';
    msg.textContent = '';
  } else {
    iframe.style.display = 'none';
    msg.textContent = '❌ Zugriff nicht freigeschaltet. Bitte buche zuerst ein Abo.';
  }
}
