"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { MapPin, CreditCard, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { useCheckAuth } from "@/hooks/useAuth";
import { CartErrorAlert } from "@/components/alert";

const checkoutSchema = z.object({
  address: z.string().min(5, "Full address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(6, "Valid postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [alertConfig, setAlertConfig] = useState<{ title: string; message: string } | null>(null);

  const { data: cartResponse, isLoading: cartLoading } = useCart();
  const { data: authResponse } = useCheckAuth();
  
  const user = authResponse?.data?.User;
  const cart = cartResponse?.cart;

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (formData: CheckoutFormData) => {
    if (!user) {
      setAlertConfig({ title: "Auth Required", message: "Please login to continue." });
      return;
    }

    setIsProcessing(true);
    try {
      const { data: orderData } = await axios.post("/api/checkout", {
        shippingAddress: formData,
        userId: user._id,
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        name: "ECOM",
        description: "Payment for Order #" + orderData.mongoOrderId.slice(-6),
        order_id: orderData.razorpayOrderId,
        handler: async function (response: any) {
          try {
            await axios.post("/api/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              mongoOrderId: orderData.mongoOrderId,
              userId: user._id
            });
            router.push("/profile");
          } catch (err) {
            setAlertConfig({ title: "Verification Error", message: "Payment was successful but verification failed." });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#000000" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      setAlertConfig({ 
        title: "Checkout Error", 
        message: err.response?.data?.msg || "Gateway initialization failed." 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartLoading) return <div className="min-h-screen flex items-center justify-center font-black italic uppercase text-2xl">Protocol Loading...</div>;

  const subtotal = cart?.totalAmount || 0;
  const shipping = subtotal > 999 ? 0 : 150;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-white min-h-screen">
      <h1 className="mb-12 text-5xl font-black uppercase tracking-tighter italic text-slate-900">
        Checkout <span className="text-slate-300 ml-2">Secure</span>
      </h1>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* SHIPPING FORM */}
        <div className="space-y-10">
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-black pb-2">
              <MapPin size={20} />
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">Shipping Logistics</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Street Address</Label>
                <Input {...register("address")} placeholder="123 Minimalist Way" className="h-14 rounded-2xl border-2 border-slate-100 focus:border-black transition-all outline-none" />
                {errors.address && <p className="text-xs font-bold text-red-500 italic">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">City</Label>
                  <Input {...register("city")} placeholder="Surat" className="h-14 rounded-2xl border-2 border-slate-100 focus:border-black transition-all" />
                  {errors.city && <p className="text-xs font-bold text-red-500 italic">{errors.city.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">State</Label>
                  <Input {...register("state")} placeholder="Gujarat" className="h-14 rounded-2xl border-2 border-slate-100 focus:border-black transition-all" />
                  {errors.state && <p className="text-xs font-bold text-red-500 italic">{errors.state.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Postal Code</Label>
                  <Input {...register("postalCode")} placeholder="395001" className="h-14 rounded-2xl border-2 border-slate-100 focus:border-black transition-all" />
                  {errors.postalCode && <p className="text-xs font-bold text-red-500 italic">{errors.postalCode.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Country</Label>
                  <Input {...register("country")} placeholder="India" className="h-14 rounded-2xl border-2 border-slate-100 focus:border-black transition-all" />
                  {errors.country && <p className="text-xs font-bold text-red-500 italic">{errors.country.message}</p>}
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b-2 border-black pb-2">
              <CreditCard size={20} />
              <h2 className="text-sm font-black uppercase tracking-[0.2em]">Payment Protocol</h2>
            </div>
            <div className="rounded-2xl border-2 border-black p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-slate-100 rounded-xl flex items-center justify-center text-black">
                  <ShieldCheck size={24} />
                </div>
                <span className="font-black uppercase tracking-tight">Razorpay Secure</span>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic text-green-500">Live</span>
            </div>
          </section>
        </div>

        {/* ORDER SUMMARY */}
        <div className="h-fit rounded-[2.5rem] bg-black p-10 text-white shadow-2xl">
          <h2 className="mb-8 text-2xl font-black uppercase tracking-tighter italic underline underline-offset-8 decoration-slate-700">Summary</h2>
          
          <div className="space-y-6">
            <div className="max-h-60 overflow-y-auto pr-2 space-y-4 no-scrollbar">
              {cart?.item.map((item: any) => (
                <div key={item.product._id} className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <p className="font-bold uppercase text-sm tracking-tight">{item.product.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">QTY: {item.quantity}</p>
                  </div>
                  <p className="font-black italic">₹{item.amount.toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 text-sm font-bold uppercase tracking-widest">
              <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-slate-400"><span>Shipping</span><span className="text-green-400">{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
              <div className="flex justify-between border-t border-white/20 pt-6 text-2xl font-black italic tracking-tighter text-white"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>

            <Button onClick={handleSubmit(onSubmit)} disabled={isProcessing} className="mt-10 w-full h-16 bg-white text-black rounded-2xl font-black text-xl hover:bg-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3">
              {isProcessing ? <Loader2 className="animate-spin" /> : "PAY NOW"}
              {!isProcessing && <ArrowRight size={20} />}
            </Button>
          </div>
        </div>
      </div>

      <CartErrorAlert title={alertConfig?.title} errorMessage={alertConfig?.message || null} onClose={() => setAlertConfig(null)} />
    </div>
  );
}