"use client";

import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Hero() {
  const scrollToCategories = () => {
    const element = document.getElementById("categories-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Right Side: Visual Section (Now First on Mobile) */}
          {/* We use lg:order-last to move it back to the right on desktop */}
          <div className="relative order-first lg:order-last">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
                alt="Premium Product Showcase"
                fill
                priority 
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-6 shadow-xl hidden sm:block border border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Limited Edition</p>
              <p className="text-xl font-black tracking-tighter text-slate-900 uppercase mt-1">Premium Quality</p>
            </div>
          </div>

          {/* Left Side: Content (Now Second on Mobile) */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center self-center lg:self-start rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900">
              <span className="mr-2 rounded-full bg-white px-2 py-0.5 text-xs font-bold shadow-sm">
                NEW
              </span>
              Fresh Arrivals for 2026
            </div>
            
            <h1 className="text-5xl font-extrabold tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl">
              ELEVATE YOUR <br />
              <span className="text-slate-500">EVERYDAY STYLE.</span>
            </h1>
            
            <p className="mx-auto max-w-lg text-lg text-slate-600 lg:mx-0">
              Discover our curated collection of premium essentials designed for 
              the modern lifestyle. Quality meets minimalist design.
            </p>
            
            <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="h-14 px-8 text-base font-bold bg-black hover:bg-slate-800 transition-all">
                  Shop Collection
                  <ShoppingBag className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-base font-bold"
                onClick={scrollToCategories}
              >
                View Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 pt-4 lg:justify-start font-medium">
              <div>
                <p className="text-2xl font-bold text-slate-900 tracking-tight">10k+</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Products</p>
              </div>
              <div className="border-l border-slate-200 pl-8">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">24/7</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Support</p>
              </div>
              <div className="border-l border-slate-200 pl-8">
                <p className="text-2xl font-bold text-slate-900 tracking-tight">Fast</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Shipping</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}