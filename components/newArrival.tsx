"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "./ui/button";

// This would eventually come from your NestJS API via TanStack Query
const NEW_PRODUCTS = [
  {
    id: 1,
    name: "Minimalist Analog Watch",
    price: "₹4,999",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Premium Wireless Headphones",
    price: "₹12,499",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Leather Laptop Sleeve",
    price: "₹2,299",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Smart Desk Lamp",
    price: "₹3,499",
    category: "Home Decor",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop",
  },
];

export default function NewArrivals() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-slate-900">NEW ARRIVALS</h2>
            <p className="text-slate-500">Check out our latest collection of premium essentials.</p>
          </div>
          <Link href="/products" className="hidden text-sm font-bold text-slate-900 underline-offset-4 hover:underline sm:block">
            View All Products
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {NEW_PRODUCTS.map((product) => (
            <div key={product.id} className="group relative">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{product.category}</p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900">
                    <Link href={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="text-sm font-black text-slate-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-10 text-center sm:hidden">
            <Link href="/products">
                <Button variant="outline" className="w-full font-bold">View All Products</Button>
            </Link>
        </div>
      </div>
    </section>
  );
}