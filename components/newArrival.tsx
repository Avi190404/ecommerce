"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "./ui/button";
import { useNewArrivals } from "@/hooks/useProduct";

const NewArrivalsSkeleton = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-4">
            <div className="h-10 w-48 rounded-md bg-slate-200 animate-pulse" />
            <div className="h-4 w-64 rounded-md bg-slate-200 animate-pulse" />
          </div>
          <div className="hidden h-6 w-32 rounded-md bg-slate-200 animate-pulse sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="aspect-square w-full rounded-2xl bg-slate-200 animate-pulse" />
              <div className="space-y-3">
                <div className="h-3 w-1/4 rounded bg-slate-200 animate-pulse" />
                <div className="flex justify-between items-center">
                  <div className="h-4 w-1/2 rounded bg-slate-200 animate-pulse" />
                  <div className="h-4 w-12 rounded bg-slate-200 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function NewArrivals() {
  const { data: newArrival, isLoading, error } = useNewArrivals();
  if (isLoading) return <NewArrivalsSkeleton />;
  if (error) {
    return (
      <div className="py-16 text-center text-slate-500">
        <p>Unable to load new arrivals at this time.</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-16 animate-in fade-in duration-700">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900 uppercase">
              NEW ARRIVALS
            </h2>
            <p className="text-slate-500">Check out our latest collection of premium essentials.</p>
          </div>
          <Link 
            href="/products" 
            className="hidden text-sm font-bold text-slate-900 underline-offset-4 hover:underline sm:block"
          >
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {newArrival?.data.map((product: any) => (
            <div key={product._id} className="group relative flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={true}
                />
                
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100 backdrop-blur-[2px]">
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:scale-110 transition-transform">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Link href={`/products/${product._id}`}>
                    <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:scale-110 transition-transform">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-4 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] mb-1">
                      {product.category}
                    </p>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                      <Link href={`/products/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-black text-slate-900 whitespace-nowrap">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center sm:hidden">
          <Link href="/products">
            <Button variant="outline" className="w-full font-bold">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}