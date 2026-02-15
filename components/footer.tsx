"use client";

import { Facebook, Twitter, Youtube, Instagram, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Footer() {
  const footerLinks = [
    { name: "Payments", href: "/payments" },
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Working Hours", href: "/hours" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com" },
    { Icon: Twitter, href: "https://twitter.com" },
    { Icon: Youtube, href: "https://youtube.com" },
    { Icon: Instagram, href: "https://instagram.com" },
  ];

  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-slate-100 gap-8">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight">Join our newsletter</h3>
            <p className="text-slate-500 mt-1 text-sm">Get the latest updates on new products and upcoming sales.</p>
          </div>
          <form className="flex w-full max-w-sm items-center space-x-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-slate-400"
              />
            </div>
            <Button type="submit" className="bg-black text-white hover:bg-slate-800">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12">
          
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block group">
              <h1 className="text-2xl font-bold tracking-tighter group-hover:text-slate-600 transition-colors">ECOM</h1>
            </Link>
            <h2 className="text-3xl font-bold leading-tight max-w-sm text-slate-900">
              Caring about your safety with professional service and quality.
            </h2>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href }, idx) => (
                <Link 
                  key={idx} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-9 w-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:text-black transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-6 text-slate-400">About Us</h4>
            <ul className="space-y-4 text-sm font-medium">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 text-slate-600 hover:text-black transition-colors">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-slate-400" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 font-medium">
          <p>© 2026 EcomStore. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-black">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-black">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}