'use client';
import { useState } from 'react';
import Image from 'next/image';
import banner from '../../public/banner.png';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSent(true);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={banner}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Contact Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-sm text-gray-600">We'd love to hear from you</p>
        </div>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-700 font-semibold">✅ Message sent successfully!</p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-red-500 hover:text-red-600 font-semibold underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">❌ {error}</p>
              </div>
            )}

            <input
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition disabled:opacity-50"
              placeholder="Name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              required
              disabled={loading}
            />

            <input
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition disabled:opacity-50"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              required
              disabled={loading}
            />

            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition resize-none disabled:opacity-50"
              placeholder="Message"
              rows="5"
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
              required
              disabled={loading}
            />

            <button
              type="submit"
              className="w-full h-11 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}