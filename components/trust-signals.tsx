"use client";

import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const VALUES = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "On all orders above ₹999",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "100% protected checkout",
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    desc: "30-day money back guarantee",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    desc: "Dedicated customer service",
  },
];

export default function TrustSignals() {
  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 sm:text-4xl uppercase">
            Why Choose Us
          </h2>
          <div className="mx-auto mt-2 h-1 w-20 bg-black rounded-full" /> {/* Aesthetic accent */}
          <p className="mt-4 text-slate-500 max-w-lg mx-auto">
            We prioritize your experience with premium service, secure transactions, and dedicated support at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
              <div className="rounded-full bg-slate-50 p-6 text-slate-900 transition-colors group-hover:bg-black group-hover:text-white">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 tracking-tight">{item.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}