// 📁 api/create-checkout-session.js
// Erstellt Stripe Checkout Session für Honey Signature & Coaching inkl. 7 Tage Trial & vollständiger Kundendaten-Erfassung

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { email, abo, name, company, address } = req.body;

  const prices = {
    signature: 'price_4gM00j1t60zb7t2fPv8Zq01',
    coaching: 'price_8x29AT9ZCfu5bJi46N8Zq02'
  };

  const selectedPrice = prices[abo] || prices.signature;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      customer_creation: 'always',
      line_items: [
        {
          price: selectedPrice,
          quantity: 1
        }
      ],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          product_id: abo,
          source: 'honey-gpt-premium',
          name,
          company,
          address
        }
      },
      metadata: {
        email,
        name,
        company,
        address,
        product_id: abo
      },
      success_url: `https://www.kaija-marketing.pro/success?email=${email}&abo=${abo}`,
      cancel_url: 'https://www.kaija-marketing.pro/cancel'
    }, {
      expand: ['line_items']
    });

    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error('[Stripe Checkout Error]', err);
    res.status(500).json({ error: err.message });
  }
}

/*
✅ FRONTEND-POST
fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'kunde@example.com',
    abo: 'signature',
    name: 'Max Beispiel',
    company: 'Testfirma GmbH',
    address: 'Musterweg 1, 8000 Zürich'
  })
});
*/
