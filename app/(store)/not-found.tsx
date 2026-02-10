import Link from 'next/link';

export default function StoreNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 text-center">
      {/* Modern Soft UI */}
      <div className="max-w-md">
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="發9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Looking for something?</h1>
        <p className="text-lg text-slate-600 mb-8">
          We can't find that page. Our best products are just a click away, though!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Back to Home
          </Link>
          <Link 
            href="/search" 
            className="px-8 py-3 bg-white text-slate-700 border border-slate-200 font-semibold rounded-lg hover:bg-slate-50 transition-all"
          >
            Search Products
          </Link>
        </div>
      </div>
    </div>
  );
}