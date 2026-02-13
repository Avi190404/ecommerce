"use client"

import { Menu, Search, ShoppingCart, X } from "lucide-react";
import SearchBar from "./searchBar";
import { Button } from "./ui/button";
import { useState } from "react";

export default function Navbar(){
    const [ isOpen, setIsOpen ] = useState(false);
    return(
        <nav className="border-b">
            <div className="mx-auto max-w-7xl">
                <div className="flex h-16 items-center justify-between gap-4">
                    <div className="shrink-0">
                        <h1 className="text-xl font-bold tracking-tighter">ECOM</h1>
                    </div>
                    <div className="hidden md:block flex-1 max-w-md lg:max-w-lg">
                        <SearchBar value="" onChange={() => {}} className="w-full"/>
                    </div>
                    <div className="hidden md:flex gap-3 items-center">
                        <Button variant="outline" className="relative">
                            <ShoppingCart className="h-5 w-5"/>
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">3</span>
                        </Button>
                        <Button variant="outline">Login</Button>
                    </div>
                    <div className="flex items-center gap-2 md:hidden">
                        <Button variant="outline" className="relative" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">3</span>
                        </Button>
                        <Button variant="outline" className="relative" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>
            
            {isOpen && (
                <div className="flex flex-col p-4 space-y-4 gap-2 md:hidden">
                    <div className="flex items-center justify-center gap-2">
                        <SearchBar value="" onChange={() => {}} className="w-full"/>
                        <Button variant="ghost"><Search/></Button>
                    </div>
                    <div>
                        <Button variant="ghost" className="w-full">Login</Button>
                    </div>
                </div>
            )}
        </nav>
    )
}