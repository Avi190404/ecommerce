"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useUpdateCart } from "@/hooks/useCart";

function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 animate-pulse sm:px-6 lg:px-8">
      <div className="mb-10 h-10 w-48 rounded bg-slate-200" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-6 border-b border-slate-100 pb-8">
              <div className="h-24 w-24 shrink-0 rounded-2xl bg-slate-200 sm:h-32 sm:w-32" />
              <div className="flex flex-1 flex-col justify-between py-2">
                <div className="space-y-3">
                  <div className="h-5 w-2/3 rounded bg-slate-200" />
                  <div className="h-4 w-1/4 rounded bg-slate-100" />
                  <div className="h-6 w-1/5 rounded bg-slate-200 mt-2" />
                </div>
                <div className="h-10 w-32 rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit rounded-3xl bg-slate-100 p-8">
          <div className="mb-6 h-6 w-24 rounded bg-slate-200" />
          <div className="space-y-4">
            <div className="flex justify-between"><div className="h-4 w-20 rounded bg-slate-200" /><div className="h-4 w-16 rounded bg-slate-200" /></div>
            <div className="flex justify-between"><div className="h-4 w-20 rounded bg-slate-200" /><div className="h-4 w-16 rounded bg-slate-200" /></div>
            <div className="border-t border-slate-200 pt-4 flex justify-between">
              <div className="h-6 w-24 rounded bg-slate-200" />
              <div className="h-6 w-20 rounded bg-slate-200" />
            </div>
          </div>
          <div className="mt-8 h-14 w-full rounded-2xl bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { data: cartResponse, isLoading, error } = useCart();
  const { mutate: updateCart, isPending: isUpdating } = useUpdateCart();
  
  const cart = cartResponse?.cart;

  const handleQuantityChange = (productId: string, action: "increment" | "decrement") => {
    updateCart({ productId, action });
  };

  const handleRemove = (productId: string) => {
    updateCart({ productId, action: "remove" });
  };

  if (isLoading) return <CartSkeleton />;

  if (error || !cart || cart.item.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <ShoppingBag size={64} className="text-slate-200" />
        <h2 className="text-2xl font-bold tracking-tighter uppercase text-slate-900">Your cart is empty</h2>
        <Link href="/products">
          <Button className="bg-black font-bold h-12 px-8">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  const subtotal = cart.totalAmount;
  const shipping = subtotal > 999 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-10 text-3xl font-extrabold tracking-tighter text-slate-900 uppercase italic">
        Your Bag <span className="text-slate-300 ml-2">[{cart.item.length}]</span>
      </h1>
      
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {cart.item.map((item: any) => (
            <div key={item.product._id} className={`flex gap-6 border-b border-slate-100 pb-8 transition-opacity duration-300 ${isUpdating ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-slate-100 sm:h-32 sm:w-32 border">
                <Image 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  fill 
                  className="object-cover" 
                />
              </div>
              
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg uppercase tracking-tight">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                      Category: {item.product.category[0]}
                    </p>
                    <p className="mt-1 text-lg font-black text-slate-900">
                      ₹{item.amount.toLocaleString()}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleRemove(item.product._id)} 
                    disabled={isUpdating}
                    className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-xl bg-slate-50 p-1 border border-slate-200">
                    <button 
                      onClick={() => handleQuantityChange(item.product._id, "decrement")} 
                      disabled={isUpdating}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center text-sm font-black">
                      {isUpdating ? <Loader2 size={12} className="animate-spin mx-auto" /> : item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.product._id, "increment")} 
                      disabled={isUpdating}
                      className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <p className="text-sm font-bold text-slate-400">
                    Total: <span className="text-slate-900 font-black">₹{(item.amount * item.quantity).toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-3xl bg-slate-900 p-8 text-white shadow-2xl shadow-slate-200">
          <h2 className="mb-6 text-xl font-bold tracking-tighter uppercase italic">Summary</h2>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-white">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Shipping</span>
              <span className="font-bold text-green-400">
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>
            <div className="border-t border-slate-700 pt-4 flex justify-between text-xl font-black text-white">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
          
          <Link href="/checkout">
            <Button 
              className="mt-8 w-full bg-white text-black h-14 font-black text-lg hover:bg-slate-200 transition-all rounded-2xl"
              disabled={isUpdating}
            >
              {isUpdating ? "UPDATING..." : "CHECKOUT"}
              {!isUpdating && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </Link>
          
          <div className="mt-6">
            <p className="text-center text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Secure Checkout with Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}