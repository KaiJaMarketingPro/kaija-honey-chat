import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt.' });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Gültige E-Mail ist erforderlich.' });
  }

  const referer = req.headers.referer || "";
  if (!referer.includes("kaija-marketing.pro")) {
    return res.status(403).json({ error: 'Zugriff nur über KaiJa Marketing erlaubt.' });
  }

  try {
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];

    if (!customer) {
      console.warn(`[Stripe] Kein Kunde gefunden für E-Mail: ${email}`);
      return res.status(404).json({ error: 'Kein Stripe-Kunde mit dieser E-Mail gefunden.' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: 'https://www.kaija-marketing.pro/fuer-coaches'
    });

    console.info(`[Stripe] Portal-Session erstellt für ${email}`);
    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('[Stripe] Fehler beim Erstellen der Portal-Session:', err);
    return res.status(500).json({
      error: 'Ein interner Fehler ist aufgetreten. Bitte versuche es später erneut oder kontaktiere den Support.'
    });
  }
}
