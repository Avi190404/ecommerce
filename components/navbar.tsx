"use client";

import { Heart, Menu, Search, ShoppingBag, ShoppingCart, X } from "lucide-react";
import SearchBar from "./searchBar";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.length !== 0) {
      router.push(`/products?q=${searchQuery}`);
      setIsOpen(false)
    }
  };

  const { data: user, isLoading } = useCheckAuth();
  return (
    <nav className="border-b">
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="shrink-0">
            <Link href="/"><h1 className="text-xl font-bold tracking-tighter">ECOM</h1></Link>
          </div>
          <div className="hidden md:block flex-1 max-w-md lg:max-w-lg">
            <form onSubmit={handleSearch}>
                <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full"/>
            </form>
          </div>
          <div className="hidden md:flex gap-3 items-center">
            <Button variant="outline" className="relative" onClick={() => router.push('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                3
              </span>
            </Button>
            {user ? (
              <Button variant="outline" onClick={() => router.push('/profile')}>Profile</Button>
            ) : (
              <Button variant="outline" onClick={() => router.push('/login')}>Login</Button>
            )
          }
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="outline" className="relative" size="icon" onClick={() => router.push('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                3
              </span>
            </Button>
            <Button
              variant="outline"
              className="relative"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-16 z-50 md:hidden bg-white border-b p-4 shadow-xl">
          <form onSubmit={handleSearch} className="flex items-center justify-center gap-2">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button variant="ghost" type="submit">
              <Search />
            </Button>
          </form>
          <div className="mt-4">
            <Button variant="outline" onClick={() => { router.push('/wishlist'); setIsOpen(false); }} className="w-full">Wishlist <Heart /></Button>
          </div>
          <div className="mt-4">
            <Button variant="outline" onClick={() => { router.push('/orders'); setIsOpen(false); }} className="w-full">My Order <ShoppingBag/></Button>
          </div>
          <div className="mt-4">
            {user ? (
              <Button variant="outline" onClick={() => { router.push('/profile'); setIsOpen(false); }} className="w-full">Profile</Button>
            ) : (
              <Button variant="outline" onClick={() => { router.push('/login'); setIsOpen(false); }} className="w-full">Login</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
