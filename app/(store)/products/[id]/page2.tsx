"use client";

import { Badge } from "@/components/ui/badge";
import { useProductById } from "@/hooks/useProduct";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react"; // Added for better UI
import { Button } from "@/components/ui/button";

export default function ProductPage(){
  const params = useParams()
  const { id } = params;

  const { data: product, isLoading, error } = useProductById(id as string)
  const [image, setImage] = useState<string | null>(null);

  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-slate-400">Loading Product...</div>
    </div>
  );
  
  if (error || !product?.data) return <div className="p-10 text-center">Product not found.</div>;

  const mainImage = image || product.data.images[0];

  return (
    <div className="min-h-screen w-full bg-white md:bg-slate-50/50 py-6 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 1 column on mobile, 2 on MD+ */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 bg-white md:rounded-3xl md:border md:p-8 md:shadow-sm">
          
          {/* LEFT COLUMN: Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image Viewport */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
              <Image 
                src={mainImage} 
                alt={product.data.name} 
                fill 
                className="object-cover transition-opacity duration-300" 
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Thumbnail X-Scroll */}
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
              {product.data.images.map((img: string, index: number) => (
                <button 
                  key={index} 
                  className={`relative aspect-square w-20 flex-shrink-0 snap-start overflow-hidden rounded-xl bg-slate-100 border-2 transition-all ${
                    mainImage === img ? "border-slate-900" : "border-transparent opacity-70 hover:opacity-100"
                  }`} 
                  onClick={() => setImage(img)}
                >
                  <Image src={img} alt="thumbnail" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Info */}
          <div className="flex flex-col justify-start space-y-6 py-2">
            <div className="space-y-4">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {product.data.category.map((cat: string) => (
                  <Badge key={cat} variant="secondary" className="px-3 py-1 text-[10px] uppercase tracking-widest">
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Title & Rating */}
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-5xl uppercase">
                  {product.data.name}
                </h1>
                <div className="flex items-center gap-1 text-orange-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold text-slate-700">{product.data.rating}</span>
                  <span className="text-xs text-slate-400">({product.data.reviewNum} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="pt-2">
                <p className="text-3xl font-black text-slate-900">
                  ₹{product.data.price.toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">About this product</h3>
                <p className="text-base leading-relaxed text-slate-600">
                  {product.data.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-6 sm:flex-row">
              <Button size="lg" className="h-14 flex-1 rounded-2xl text-lg font-bold shadow-xl shadow-slate-200 transition-transform active:scale-95">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
            
            {/* Simple Stock Indicator */}
            <p className="text-center text-xs font-medium text-slate-400 sm:text-left">
              {product.data.stock > 0 ? `Only ${product.data.stock} items left in stock` : "Out of stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}