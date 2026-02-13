"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar = ({ value, onChange, className }: SearchBarProps) => {
  return (
    <div className={cn("relative w-full group", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 group-focus-within:text-slate-600 transition-colors" />
      <Input
        type="text"
        placeholder="Search products..."
        value={value}
        className="rounded-lg border-slate-200 pl-10 h-10 bg-white focus-visible:ring-1 focus-visible:ring-slate-400 focus-visible:border-slate-400 transition-all placeholder:text-slate-400"
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
