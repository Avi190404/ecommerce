"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductById } from "@/hooks/useProduct";
import { useParams } from "next/navigation"; // Use this for client-side params

export default function ProductDetailsPage() {
  // 1. Get the ID from the URL using the Client hook
  const params = useParams();
  const id = params.id as string;

  // 2. Fetch data using your TanStack Query hook
  const { data: productResponse, isLoading, error } = useProductById(id);
  const product = productResponse?.data;

  // 3. Handle Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-slate-400" />
      </div>
    );
  }

  // 4. Handle Error or Not Found
  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link href="/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
        
        {/* Left: Image Gallery */}
        <div className="flex flex-col">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 shadow-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.images.map((img: string, idx: number) => (
              <div key={idx} className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 cursor-pointer hover:ring-2 ring-slate-900 transition-all">
                <Image src={img} alt="preview" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">
              {/* Note: product.category is an array based on your schema */}
              {product.category?.join(" / ")}
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <p className="text-3xl font-black text-slate-900">₹{product.price?.toLocaleString()}</p>
            <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
              <Star className="fill-orange-400 text-orange-400" size={16} />
              <span className="text-sm font-bold">{product.rating}</span>
              <span className="text-xs text-slate-500">({product.reviewNum} reviews)</span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-base text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <p className="text-sm font-medium text-slate-600">
                {product.stock > 0 ? `${product.stock} items in stock` : "Out of stock"}
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="h-14 w-full rounded-2xl text-lg font-bold shadow-xl shadow-slate-200 transition-transform active:scale-95" 
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                <Truck size={20} />
              </div>
              <p className="text-xs font-bold text-slate-500">Free Express Shipping</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                <ShieldCheck size={20} />
              </div>
              <p className="text-xs font-bold text-slate-500">2 Year Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}