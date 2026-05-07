import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // You'll create this in Stripe Dashboard
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id });
} catch (error) {
  console.error('Stripe error:', error);  // <-- Yeh line terminal pe print karti hai
  return NextResponse.json(
    { error: 'Failed to create checkout session' },
    { status: 500 }
  );
}
}