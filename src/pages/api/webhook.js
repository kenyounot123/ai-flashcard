// src/pages/api/webhook.js

import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser to use Stripe's raw body
  },
};

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_3a14ead10b66c6a1773a87fc1061ca9ded2f4fa8ce1c95733396c4b371c20f44";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log('PaymentIntent was successful!', paymentIntentSucceeded);
        // Add any additional logic here, like updating the database, sending an email, etc.
        break;
      // ... handle other event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
