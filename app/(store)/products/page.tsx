"use client";

import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage(){
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = [ "all", "Electronics", "Fashion", "Accessories", "Home", "Gaming" ]

  const categoryQuery = searchParams.get("category") || "all"

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if(value === "All" || value === "all"){
      params.delete(key);
    }else{
      params.set(key,value)
    }
    router.push(`/products?${params.toString()}`)
  } 
  return(
    <div className="mx-auto max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <p>OUR COLLECTION</p>
          <p>Showing 12 Premium Product</p>
        </div>
        <div>
          <Button variant="outline"><SlidersHorizontal />Short By</Button>
        </div>
      </div>
      <div className="border-b"></div>
      <div>
        <div className="flex flex-col gap-10 h-auto">
          <div className="font-bold text-gray-700">Category</div>
          <div className="flex flex-col space-y-6">
            {category.map((cat) => (
              <li key={cat} className="list-none">
                <button className={`cursor-pointer  font-semibold ${categoryQuery === cat.toLowerCase() ? "text-black underline underline-offset-8" : "text-gray-500"}`} onClick={() => updateQuery("category", cat.toLowerCase())}>{cat}</button>
              </li>
            ))}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}