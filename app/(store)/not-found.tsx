"use client";

import Link from 'next/link';
import { ShoppingBag, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StoreNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-6 text-center animate-in fade-in duration-700">
      <div className="max-w-2xl">
        <div className="mb-10 inline-flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50 text-black shadow-xl shadow-slate-100/50">
          <ShoppingBag size={40} strokeWidth={1.5} />
        </div>
        
        <h1 className="text-6xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">
          Lost in the <br /> <span className="text-slate-300">Warehouse?</span>
        </h1>
        
        <p className="text-lg text-slate-500 mb-12 font-medium uppercase tracking-widest text-xs">
          The page you are looking for has been moved or archived. <br />
          Our latest drops are still available below.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button 
              className="w-full sm:px-10 h-14 bg-black text-white font-black uppercase tracking-tighter italic text-lg rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-2xl shadow-slate-200"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return to Home
            </Button>
          </Link>
          
          <Link href="/products" className="w-full sm:w-auto">
            <Button 
              variant="outline"
              className="w-full sm:px-10 h-14 border-2 border-slate-200 bg-white text-slate-900 font-black uppercase tracking-tighter text-lg rounded-2xl hover:border-black transition-all active:scale-95"
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Products
            </Button>
          </Link>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
            Error Code: 404 // Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
}