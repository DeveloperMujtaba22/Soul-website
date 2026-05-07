export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center text-white p-8">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-xl mb-6">Thank you for your purchase.</p>
        <a 
          href="/" 
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full inline-block"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}