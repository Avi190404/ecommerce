"use client";

import Link from "next/link";
import {
    Store,
    LayoutDashboard,
    ShoppingBasket,
    Package,
    Receipt,
    LogOut,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const NavItem = ({
        href,
        icon: Icon,
        label,
    }: {
        href: string;
        icon: any;
        label: string;
    }) => (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all`}
        >
            <Icon size={20} />
            <span>{label}</span>
        </Link>
    );
    return (
        <>
            <div className="bg-white border-b border-gray-200 fixed top-0 w-full z-50 md:hidden">
                <div className="flex items-center gap-2">
                    <div className="bg-black text-white p-1.5 rounded-lg">
                        <Store className="w-5 h-5" />
                    </div>
                    <span className="font-black text-lg tracking-tighter text-slate-900">
                        Admin
                    </span>
                </div>
            </div>
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
                <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                    <div className="bg-black text-white p-1.5 rounded-lg">
                        <Store className="w-5 h-5" />
                    </div>
                    <span className="font-black text-xl tracking-tighter text-slate-900">
                        Admin
                    </span>
                </div>
                <nav>
                    <NavItem href="/admin" icon={LayoutDashboard} label="Dashboard" />
                    <NavItem href="/admin/products" icon={Package} label="Products" />
                    <NavItem href="/admin/orders" icon={ShoppingBasket} label="Order" />
                    <NavItem href="/admin/refunds" icon={Receipt} label="Refunds" />
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 px-4 py-3 cursor-pointer text-red-600 hover:bg-red-50 rounded-lg font-medium transition-all">
                        <LogOut size={20} />
                        Logout
                    </div>
                </div>
            </aside>
        </>
    );
}
