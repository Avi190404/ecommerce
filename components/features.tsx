"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default function FeaturedCollection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900">
        <div className="absolute inset-0 opacity-50">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
            alt="Featured Collection"
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative flex flex-col items-start justify-center p-8 sm:p-16 md:w-2/3 lg:w-1/2">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">
            Limited Time Only
          </span>
          <h2 className="mt-4 text-4xl font-black tracking-tighter text-white sm:text-6xl uppercase">
            The Essentials <br /> Collection
          </h2>
          <p className="mt-6 text-lg text-white/90">
            Handpicked quality items that define modern luxury. Now available with exclusive early-access pricing.
          </p>
          <Link href="/products?collection=essentials" className="mt-10">
            <Button size="lg" className="bg-white text-black hover:bg-slate-200 font-bold px-8 h-14">
              Explore Collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}