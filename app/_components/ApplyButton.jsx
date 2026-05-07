'use client';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function ApplyButton({ children, className }) {
  const [loading, setLoading] = useState(false);
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleClick = async () => {
    // Clerk abhi load ho raha hai
    if (!isLoaded) return;

    // Logged in nahi hai to sign-in pe
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    // Logged in hai, Stripe pe le jao with /application as success URL
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_1TUVZgBT5TVR1shtdSdBBYBm',
          successUrl: '/application'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start payment');
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
      onClick={handleClick}
      disabled={loading || !isLoaded}
      className={className}
    >
      {loading ? 'Processing...' : children}
    </button>
  );
}