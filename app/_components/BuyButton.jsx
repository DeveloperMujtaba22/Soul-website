'use client';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: 'price_xxxxxxxxxxxxx' // Replace with your Stripe Price ID
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Get Pro - $99'}
    </button>
  );
}