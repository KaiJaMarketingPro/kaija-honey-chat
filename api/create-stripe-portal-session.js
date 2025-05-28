// /api/create-stripe-portal-session.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // z. B. sk_live_...

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'E-Mail fehlt in der Anfrage.' });
  }

  try {
    // Suche nach Stripe-Kunde via E-Mail
    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];

    if (!customer) {
      return res.status(404).json({ error: 'Kein Stripe-Kunde mit dieser E-Mail gefunden.' });
    }

    // Erstelle Portal-Session
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.id,
      return_url: 'https://www.kaija-marketing.pro/fuer-coaches'
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe Portal Fehler:', err);
    return res.status(500).json({ error: 'Interner Fehler beim Erstellen der Session.' });
  }
}
