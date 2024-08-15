import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { userId } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'us_bank_account'],
    line_items: [
      {
        price: process.env.PRICE_ID, 
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}&status=success&userId=${userId}`,
    cancel_url: `${req.headers.origin}/`,
  });

  res.json({ id: session.id });
}
