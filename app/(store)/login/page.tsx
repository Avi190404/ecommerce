"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authSchema } from "@/types/authType";
import { Eye, EyeClosed, Lock, Mail, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@/hooks/useAuth";
import { CartErrorAlert } from "@/components/alert"; // Import your component

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [alertConfig, setAlertConfig] = useState<{ title: string; message: string } | null>(null);

  const signIn = useSignIn();
  const signUp = useSignUp();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(authSchema), 
  });
  
  const onSubmit = (formData: any) => {
    const options = {
      onError: (err: any) => {
        const status = err.response?.status;
        const msg = err.response?.data?.msg || "Something went wrong. Please try again.";

        if (status === 401) {
          setAlertConfig({ title: "Invalid Credentials", message: "The email or password you entered is incorrect." });
        } else if (status === 409) {
          setAlertConfig({ title: "Account Exists", message: "This email is already registered. Please sign in instead." });
        } else {
          setAlertConfig({ title: "Auth Error", message: msg });
        }
      }
    };

    if (isLogin) {
      signIn.mutate(formData, options);
    } else {
      signUp.mutate(formData, options);
    }
  };

  const isPending = signIn.isPending || signUp.isPending;
  
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="font-black text-slate-900 text-3xl md:text-5xl uppercase italic tracking-tighter">
            {isLogin ? "Welcome Back" : "Create Account"}
          </p>
          <p className="text-slate-500 text-center text-sm md:text-base font-medium">
            {isLogin ? "Enter your details to access your account" : "Join our community and start shopping today"}
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-2xl shadow-slate-200/50">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className="space-y-2">
                <Label className="font-bold ml-1">Username</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    placeholder="Your Name" 
                    className="flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 text-sm font-medium transition-all focus:border-black focus:bg-white outline-none"
                    {...register("name")} 
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 font-bold ml-1 italic">{errors.name.message as string}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label className="font-bold ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  placeholder="test@example.com"
                  className="flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-4 text-sm font-medium transition-all focus:border-black focus:bg-white outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-bold ml-1 italic">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <Label className="font-bold">Password</Label>
                <button type="button" className="text-xs font-bold text-slate-400 hover:text-black">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"} 
                  className="flex h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-12 text-sm font-medium transition-all focus:border-black focus:bg-white outline-none"
                  {...register("password")}
                />
                <button 
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-black"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 font-bold ml-1 italic">{errors.password.message as string}</p>}
            </div>

            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-14 rounded-2xl bg-black text-white font-black text-lg hover:bg-slate-800 transition-all active:scale-[0.98]"
            >
              {isPending ? <Loader2 className="animate-spin mr-2" /> : (isLogin ? "SIGN IN" : "CREATE ACCOUNT")}
            </Button>
          </form>
        </div>

        <div className="text-center text-sm font-medium text-slate-500">
          {isLogin ? (
            <p>Don't have an account? <span className="text-black font-black cursor-pointer underline underline-offset-4" onClick={() => setIsLogin(false)}>Sign Up</span></p>
          ) : (
            <p>Already have an account? <span className="text-black font-black cursor-pointer underline underline-offset-4" onClick={() => setIsLogin(true)}>Sign In</span></p>
          )}
        </div>
      </div>

      <CartErrorAlert 
        title={alertConfig?.title} 
        errorMessage={alertConfig?.message || null} 
        onClose={() => setAlertConfig(null)} 
      />
    </div>
  );
}