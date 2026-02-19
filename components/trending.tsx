"use client";

import Image from "next/image";
import Link from "next/link";
import { TrendingUp, ChevronRight, ChevronLeft, ShoppingCart, Eye } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { useTrending } from "@/hooks/useProduct";

const TrendingSkeleton = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
            <div className="h-8 w-48 rounded-md bg-slate-100 animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
            <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
          </div>
        </div>

        <div className="flex gap-6 overflow-hidden pb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[320px] space-y-4">
              <div className="relative aspect-[4/5] w-full rounded-2xl bg-slate-100 animate-pulse" />
              <div className="space-y-2 px-1">
                <div className="h-3 w-1/4 rounded bg-slate-100 animate-pulse" />
                <div className="flex justify-between">
                  <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
                  <div className="h-4 w-12 rounded bg-slate-100 animate-pulse" />
                </div>
                <div className="h-3 w-20 rounded bg-slate-100 animate-pulse pt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function TrendingProducts() {
  const { data: trending, isLoading, error } = useTrending();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (isLoading) return <TrendingSkeleton />;
  
  if (error) return null;

  return (
    <section className="bg-white py-16 animate-in fade-in duration-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-orange-100 p-2 text-orange-600">
              <TrendingUp size={20} />
            </div>
            <h2 className="text-2xl font-bold tracking-tighter text-slate-900 sm:text-3xl uppercase">
              Trending Now
            </h2>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("left")} 
              className="rounded-full hover:bg-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll("right")} 
              className="rounded-full hover:bg-slate-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trending?.data.map((product: any) => (
            <div 
              key={product._id} 
              className="min-w-[280px] md:min-w-[320px] snap-start group relative flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 280px, 320px"
                  loading="lazy" 
                />

                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-[2px]">
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Link href={`/products/${product._id}`}>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-4 space-y-1 px-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {product.category}
                </p>
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-slate-900 leading-tight max-w-[70%] line-clamp-1">
                    <Link href={`/products/${product._id}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm font-black text-slate-900 whitespace-nowrap">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
                <Link 
                  href={`/products/${product._id}`} 
                  className="inline-block pt-2 text-xs font-bold text-slate-600 hover:text-black hover:underline transition-all"
                >
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