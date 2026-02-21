"use client";

import { Badge } from "@/components/ui/badge";
import { useProductById } from "@/hooks/useProduct";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Star } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/useCart";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;

  // --- 1. HOOKS (Must stay at the top level, before any early returns) ---
  const { data: product, isLoading, error } = useProductById(id as string);
  const { mutate: addToCart, isPending } = useAddToCart();
  const [image, setImage] = useState<string | null>(null);

  // --- 2. EARLY RETURNS ---
  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-pulse text-slate-400 font-bold uppercase tracking-widest">
        Loading Product...
      </div>
    </div>
  );
  
  if (error || !product?.data) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-10 text-center bg-white rounded-2xl border shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Product not found</h2>
        <p className="text-slate-500 mt-2">The item you're looking for doesn't exist or was removed.</p>
      </div>
    </div>
  );

  // --- 3. LOGIC ---
  const mainImage = image || product.data.images[0];

  const handleAddToCart = () => {
    // mutate is an asynchronous call and doesn't return data directly to a variable
    addToCart(
      { productId: product.data._id, quantity: 1 },
      {
        onSuccess: (response) => {
          console.log("Product added to cart successfully!", response);
          // Pro Tip: You could trigger a Toast notification here
        },
        onError: (err) => {
          console.error("Failed to add product to cart:", err);
        },
      }
    );
  };

  return (
    <div className="min-h-screen w-full bg-white md:bg-slate-50/50 py-6 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: 1 column on mobile, 2 on Desktop */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 bg-white md:rounded-3xl md:border md:p-8 md:shadow-sm">
          
          {/* LEFT COLUMN: Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image Viewport */}
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-100">
              <Image 
                src={mainImage} 
                alt={product.data.name} 
                fill 
                className="object-cover transition-all duration-500 hover:scale-105" 
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
                    mainImage === img ? "border-slate-900 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
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
                  <Badge key={cat} variant="secondary" className="px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                    {cat}
                  </Badge>
                ))}
              </div>

              {/* Title & Rating */}
              <div className="space-y-1">
                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl lg:text-5xl uppercase leading-none">
                  {product.data.name}
                </h1>
                <div className="flex items-center gap-1 text-orange-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold text-slate-700">{product.data.rating || "4.5"}</span>
                  <span className="text-xs text-slate-400">({product.data.reviewNum || "0"} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="pt-2">
                <p className="text-3xl font-black text-slate-900 tracking-tighter">
                  ₹{product.data.price.toLocaleString()}
                </p>
              </div>

              {/* Description */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Product Description</h3>
                <p className="text-base leading-relaxed text-slate-600">
                  {product.data.description}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 pt-6 sm:flex-row">
              <Button 
                size="lg" 
                onClick={handleAddToCart}
                disabled={isPending || product.data.stock === 0}
                className="h-14 flex-1 rounded-2xl text-lg font-bold shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isPending ? "Adding to Bag..." : "Add to Cart"}
              </Button>
            </div>
            
            {/* Stock Indicator */}
            <p className="text-center text-xs font-medium text-slate-400 sm:text-left flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${product.data.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></span>
              {product.data.stock > 0 ? `In Stock: ${product.data.stock} units available` : "Currently Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}