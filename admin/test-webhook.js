// 📁 /admin/test-webhook.js
// Webhook-Test mit Dummy-Mail

fetch('https://hook.eu2.make.com/7byhdo41nn7j2tm8x1yn06euqtp7y4r2', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    timestamp: new Date().toISOString(),
    email: 'test@dummy.ch',
    consent: true,
    source: 'unit-test',
    brevo_triggered: true
  })
})
.then(res => res.text())
.then(console.log)
.catch(console.error);
