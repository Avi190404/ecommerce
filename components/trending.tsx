"use client";

import Image from "next/image";
import Link from "next/link";
import { FireExtinguisher, Flame, TrendingUp, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";

const TRENDING_PRODUCTS = [
  {
    id: 101,
    name: "Ultra-Light Running Shoes",
    price: "₹8,999",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    trending: "98% demand increase"
  },
  {
    id: 102,
    name: "Noise Cancelling Earbuds",
    price: "₹15,999",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
    trending: "Top seller this week"
  },
  {
    id: 103,
    name: "Leather Commuter Bag",
    price: "₹6,499",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    trending: "1.2k views today"
  },
  {
    id: 104,
    name: "Mechanical Gaming Keyboard",
    price: "₹7,299",
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop",
    trending: "Limited stock"
  },
  {
    id: 105,
    name: "Stainless Steel Water Bottle",
    price: "₹1,899",
    category: "Home",
    image: "https://images.unsplash.com/photo-1602143393494-721d0026386d?q=80&w=800&auto=format&fit=crop",
    trending: "Sustainability choice"
  }
];

export default function TrendingProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Controls */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-orange-100 p-2 text-orange-600">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-2xl font-bold tracking-tighter text-slate-900 sm:text-3xl uppercase">Trending Now</h2>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll("left")} className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll("right")} className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TRENDING_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="min-w-[280px] md:min-w-[320px] snap-start group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 280px, 320px"
                />
                
                {/* Status Badge */}
                {/* <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
                  <Flame size={12} className="text-orange-500 fill-orange-500" />
                  {product.trending}
                </div> */}
              </div>

              <div className="mt-4 space-y-1 px-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight max-w-[70%]">{product.name}</h3>
                  <p className="text-sm font-black text-slate-900">{product.price}</p>
                </div>
                <Link href={`/product/${product.id}`} className="inline-block pt-2 text-xs font-bold text-slate-600 hover:text-black hover:underline transition-all">
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}