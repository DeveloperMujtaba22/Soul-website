'use client';
import { useState } from 'react';

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
      setForm({ name: '', email: '', message: '' }); // Reset form
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      
      {sent ? (
        <div className="bg-green-50 border border-green-200 rounded p-4">
          <p className="text-green-700">✅ Message sent successfully!</p>
          <button 
            onClick={() => setSent(false)}
            className="mt-4 text-sm text-green-600 underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-3">
              <p className="text-red-700 text-sm">❌ {error}</p>
            </div>
          )}
          
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
            disabled={loading}
          />
          
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
            disabled={loading}
          />
          
          <textarea 
            className="w-full border p-2 rounded" 
            placeholder="Message"
            rows="5"
            value={form.message}
            onChange={e => setForm({...form, message: e.target.value})}
            required
            disabled={loading}
          />
          
          <button 
            type="submit" 
            className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}