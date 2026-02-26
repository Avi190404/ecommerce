"use client";

import { useRouter } from "next/navigation";
import { 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckAuth, useLogOut } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: authResponse, isLoading } = useCheckAuth();
  const { mutate: logOut, isPending: isLoggingOut } = useLogOut()
  const user = authResponse?.data?.User;

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const menuItems = [
    { icon: <Package size={20} />, label: "MY ORDERS", href: "/profile/orders", sub: "Track & manage shipments" },
    { icon: <Heart size={20} />, label: "WISHLIST", href: "/wishlist", sub: "Your curated selection" },
    { icon: <Settings size={20} />, label: "SETTINGS", href: "/profile/settings", sub: "Security & preferences" },
  ];

  const handleLogOut = () => {
    logOut(undefined, {
      onSuccess: () => {
        console.log("Session terminated successfully");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 animate-pulse sm:px-6 lg:px-8">
        <div className="h-64 w-full rounded-[3rem] bg-slate-100" />
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="space-y-4">
             {[1,2,3,4].map(i => <div key={i} className="h-16 w-full rounded-2xl bg-slate-50" />)}
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
             <div className="h-48 rounded-[2.5rem] bg-slate-50" />
             <div className="h-48 rounded-[2.5rem] bg-slate-50" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 bg-white">
      <div className="relative overflow-hidden rounded-[3rem] bg-black p-10 text-white md:p-16 shadow-2xl">
        <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white/10 bg-white text-4xl font-black text-black shadow-xl">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <h1 className="text-5xl font-black uppercase tracking-tighter italic leading-none">
                  {user.name}
                </h1>
                <ShieldCheck className="text-white opacity-40" size={28} />
              </div>
              <p className="mt-2 text-slate-400 font-bold uppercase tracking-widest text-xs">
                {user.email}
              </p>
              <div className="mt-5 inline-block rounded-full border border-white/20 bg-white/5 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                AUTHENTICATED AS {user.role?.toUpperCase()}
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="h-14 rounded-2xl border-white/20 bg-transparent px-8 font-black uppercase tracking-tighter text-white hover:bg-white hover:text-black transition-all active:scale-95">
            EDIT ACCOUNT
          </Button>
        </div>
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-[100px]"></div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-3">
        <div className="space-y-2">
          <h3 className="mb-8 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Control Center</h3>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => router.push(item.href)}
              className="flex w-full items-center justify-between rounded-3xl p-5 text-left transition-all hover:bg-slate-50 group border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <span className="block text-sm font-black uppercase tracking-tight text-slate-900 leading-none">{item.label}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">{item.sub}</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-200 group-hover:text-black group-hover:translate-x-1 transition-all" />
            </button>
          ))}
          
          <div className="pt-8 mt-4 border-t border-slate-100">
            <button 
              onClick={handleLogOut}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-5 rounded-3xl p-5 text-left text-red-500 hover:bg-red-50 transition-all active:scale-95 group disabled:opacity-50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                {isLoggingOut ? <Loader2 className="animate-spin" size={20} /> : <LogOut size={20} />}
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Terminate Session</span>
            </button>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            
            <div className="group rounded-[2.5rem] border-2 border-slate-100 p-10 transition-all hover:border-black">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Completed Orders</p>
              <div className="mt-6 flex items-end justify-between">
                <h2 className="text-7xl font-black tracking-tighter leading-none">0</h2>
                <Package size={40} className="text-slate-100 group-hover:text-black transition-colors" />
              </div>
              <button className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black hover:gap-3 transition-all">
                ACCESS HISTORY <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="group rounded-[2.5rem] border-2 border-slate-100 p-10 transition-all hover:border-black">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Saved Items</p>
              <div className="mt-6 flex items-end justify-between">
                <h2 className="text-7xl font-black tracking-tighter leading-none">0</h2>
                <Heart size={40} className="text-slate-100 group-hover:text-red-500 transition-colors" />
              </div>
              <button className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-black hover:gap-3 transition-all">
                MANAGE CURATION <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}