"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authSchema } from "@/types/authType";
import { Eye, EyeClosed, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn, useSignUp } from "@/hooks/useAuth";

export default function AuthPage() {
  const [ isLogin, setIsLogin ] = useState(true)
  const [ showPassword, setShowPassword ] = useState(false)
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(authSchema), 
  });
  const onSubmit = (formData: any) => {
    const user = {...formData}
    const { data, isLoading, error } = isLogin ? useSignIn(user) : useSignUp(user)
    console.log(user)
  }
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-100 space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="font-bold text-slate-800 text-xl sm:text-2xl md:text-4xl">{isLogin ? "Welcome Back" : "Create Account"}</p>
          <p className=" text-slate-600 text-center text-sm md:text-xl ">
            {isLogin ? "Enter your details to access your account" : "Join our community and start shopping today"}
          </p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="user">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <Input placeholder="Username" className="pl-10" required {...register("username")} />
                </div>
                {errors.username && (
                  <p className="text-xs text-red-500">{errors.username.message as string}</p>
                )}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input
                  type="email"
                  placeholder="test@example.com"
                  className="pl-10"
                  required
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message as string}</p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Label htmlFor="Forget" className="text-slate-500">
                  Forget
                </Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                <Input placeholder="Password" type={showPassword ? "text" : "password"} className="pl-10" required {...register("password")}/>
                {showPassword ? (
                  <EyeClosed className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(false)} />
                ) : (
                  <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(true)} />
                )}
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message as string}</p>
              )}
            </div>
            <div>
              <Button type="submit" className="w-full">Sign In</Button>
            </div>
          </form>
        </div>
        {isLogin ? (
          <div className="flex items-center justify-center w-full gap-2">
            Don't have an account? <span className="font-bold cursor-pointer" onClick={() => setIsLogin(false)}>Sign Up</span>
          </div>
        ): (
          <div className="flex items-center justify-center w-full gap-2">
            Already have an account? <span className="font-bold cursor-pointer" onClick={() => setIsLogin(true)}>Sign In</span>
          </div>
        )}
      </div>
    </div>
  );
}
