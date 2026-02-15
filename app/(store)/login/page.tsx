"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px] space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900 uppercase">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin 
              ? "Enter your details to access your account" 
              : "Join our community and start shopping today"}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="name" placeholder="Avi Patel" className="pl-10" required />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="email" type="email" placeholder="name@example.com" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <Link href="#" className="text-xs font-bold text-slate-400 hover:text-black transition-colors">
                    Forgot?
                  </Link>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input id="password" type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>

            <Button className="w-full bg-black h-12 font-bold hover:bg-slate-800 transition-all">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-slate-500 hover:text-black transition-colors"
          >
            {isLogin 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}