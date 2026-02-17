"use client";

import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  CreditCard,
  MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- MOCK TEST DATA ---
const MOCK_USER = {
  name: "Avi Patel",
  email: "avi19042004@gmail.com",
  joined: "December 2025",
  totalOrders: 12,
  wishlistCount: 5,
  membership: "Premium"
};

export default function ProfilePage() {
  const router = useRouter();

  const menuItems = [
    { icon: <Package size={18} />, label: "My Orders", href: "/profile/orders", sub: "View your purchase history" },
    { icon: <Heart size={18} />, label: "Wishlist", href: "/wishlist", sub: "Items you've saved for later" },
    { icon: <MapPin size={18} />, label: "Addresses", href: "/profile/address", sub: "Manage delivery locations" },
    { icon: <CreditCard size={18} />, label: "Payment Methods", href: "/profile/payment", sub: "Saved cards and UPI" },
    { icon: <Settings size={18} />, label: "Settings", href: "/profile/settings", sub: "Privacy and notifications" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Top Profile Card */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 text-white md:p-12">
        <div className="relative z-10 flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-black text-black">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <h1 className="text-4xl font-black uppercase tracking-tighter italic">
                  {MOCK_USER.name}
                </h1>
                <ShieldCheck className="text-blue-400" size={24} />
              </div>
              <p className="mt-1 text-slate-400 font-medium">{MOCK_USER.email}</p>
              <div className="mt-3 inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                Member since {MOCK_USER.joined}
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="border-white/20 bg-transparent font-bold text-white hover:bg-white hover:text-black transition-all">
            Edit Profile
          </Button>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          <h3 className="mb-6 px-4 text-xs font-black uppercase tracking-widest text-slate-400">Account Overview</h3>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all hover:bg-slate-50 group"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 group-hover:bg-black group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <span className="block text-sm font-bold text-slate-900">{item.label}</span>
                  <span className="text-xs text-slate-400">{item.sub}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </button>
          ))}
          
          <div className="pt-6">
            <button className="flex w-full items-center gap-4 rounded-2xl p-4 text-left text-red-500 hover:bg-red-50 transition-colors">
              <LogOut size={18} />
              <span className="text-sm font-bold uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Statistics and Quick Info */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 p-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Orders Placed</p>
              <div className="mt-4 flex items-end justify-between">
                <h2 className="text-5xl font-black tracking-tighter">{MOCK_USER.totalOrders}</h2>
                <Package size={32} className="text-slate-100" />
              </div>
              <Button variant="link" className="mt-4 h-auto p-0 font-bold text-black underline underline-offset-4">
                View History
              </Button>
            </div>

            <div className="rounded-3xl border border-slate-100 p-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Saved to Wishlist</p>
              <div className="mt-4 flex items-end justify-between">
                <h2 className="text-5xl font-black tracking-tighter">{MOCK_USER.wishlistCount}</h2>
                <Heart size={32} className="text-slate-100" />
              </div>
              <Button variant="link" className="mt-4 h-auto p-0 font-bold text-black underline underline-offset-4">
                Manage Likes
              </Button>
            </div>

            <div className="sm:col-span-2 overflow-hidden rounded-3xl bg-blue-600 p-8 text-white">
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Premium Benefits</h3>
                  <p className="mt-2 text-sm text-blue-100">
                    You're currently a <span className="font-bold text-white">VIP Member</span>. 
                    Enjoy free express shipping on all orders.
                  </p>
                </div>
                <div className="h-20 w-20 flex-shrink-0 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                   <ShieldCheck size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}