"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - eventually fetched from your NestJS/PostgreSQL backend
const INITIAL_CART = [
  {
    id: 1,
    name: "Minimalist Analog Watch",
    price: 4999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=200&h=200&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Premium Wireless Headphones",
    price: 12499,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&h=200&auto=format&fit=crop",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 999 ? 0 : 150; // Matches your trust signals
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <ShoppingBag size={64} className="text-slate-200" />
        <h2 className="text-2xl font-bold tracking-tighter uppercase">Your cart is empty</h2>
        <Link href="/products">
          <Button className="bg-black font-bold">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-extrabold tracking-tighter text-slate-900 uppercase">Your Cart</h1>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-6 border-b border-slate-100 pb-8">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-32 sm:w-32">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm font-black text-slate-900">₹{item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-lg border border-slate-200">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-slate-50">
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-slate-50">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-3xl bg-slate-50 p-8">
          <h2 className="mb-6 text-xl font-bold tracking-tighter uppercase">Order Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping</span>
              <span className="font-bold text-slate-900">
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            <div className="border-t border-slate-200 pt-4 flex justify-between text-lg font-black text-slate-900">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          
          <Link href="/checkout">
            <Button className="mt-8 w-full bg-black h-14 font-bold text-lg hover:bg-slate-800 transition-all">
              Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <p className="mt-4 text-center text-xs text-slate-400 font-medium">
            Shipping and taxes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}