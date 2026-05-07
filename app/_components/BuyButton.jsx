'use client';
import { useState } from 'react';

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
          priceId: 'price_1TUVZgBT5TVR1shtdSdBBYBm' // <-- Yahan real Price ID daalo
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      window.location.href = data.url;
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong: ' + error.message);
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