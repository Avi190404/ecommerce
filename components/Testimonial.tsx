"use client";

import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Alex Johnson",
    role: "Verified Buyer",
    content: "The quality of the minimalist watch exceeded my expectations. Fast shipping and great packaging.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    role: "Verified Buyer",
    content: "Excellent customer support! They helped me with my exchange within minutes. Highly recommend.",
    rating: 5
  },
  {
    name: "Michael Ross",
    role: "Verified Buyer",
    content: "Clean design and very intuitive store. The checkout process was seamless.",
    rating: 4
  }
];

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-slate-900 uppercase">What Our Clients Say</h2>
          <p className="mt-2 text-slate-500">Real feedback from our global community.</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div key={i} className="rounded-2xl bg-white p-8 shadow-sm border border-slate-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, starI) => (
                  <Star 
                    key={starI} 
                    size={16} 
                    className={starI < review.rating ? "fill-orange-400 text-orange-400" : "text-slate-200"} 
                  />
                ))}
              </div>
              <p className="text-slate-600 italic mb-6">"{review.content}"</p>
              <div>
                <p className="font-bold text-slate-900">{review.name}</p>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}