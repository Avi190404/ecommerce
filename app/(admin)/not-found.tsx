import Link from 'next/link';

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-black">
      {/* Brutalist Style 404 */}
      <div className="border-4 border-black p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center">
        <h1 className="text-9xl font-black tracking-tighter uppercase mb-2">404</h1>
        <div className="bg-black text-white px-4 py-1 inline-block font-bold uppercase tracking-widest text-sm mb-6">
          Resource Not Found
        </div>
        
        <h2 className="text-xl font-bold uppercase mb-4">You've reached a restricted or missing segment</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
          The administrative route you are looking for does not exist in the current system manifest.
        </p>

        <Link 
          href="/admin" 
          className="inline-block bg-black text-white px-8 py-4 font-black uppercase tracking-widest hover:bg-gray-800 transition-all border-2 border-black"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}