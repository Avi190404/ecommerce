"use client";

import Link from "next/link";
import Image from "next/image";

const CATEGORIES = [
  { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=300&h=300&fit=crop", href: "/products?category=electronics" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=400&h=400&auto=format&fit=crop", href: "/products?category=fashion" },
  { name: "Accessories", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&h=300&fit=crop", href: "/products?category=accessories" },
  { name: "Home", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=300&h=300&fit=crop", href: "/products?category=home" },
  { name: "Gaming", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300&h=300&fit=crop", href: "/products?category=gaming" },
];

export default function Categories() {
  return (
    <section className="bg-slate-50 py-16" id="categories-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tighter text-slate-900">SHOP BY CATEGORY</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group flex flex-col items-center gap-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white bg-white shadow-md transition-all group-hover:border-black md:h-32 md:w-32">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest text-slate-600 group-hover:text-black transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}