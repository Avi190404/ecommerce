"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useProduct } from "@/hooks/useProduct";
import { Eye, PackageSearch, ShoppingCart, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string[];
  images: string[];
  stock: number;
  score: number;
  highlights: {
    name?: string[];
    description?: string[];
  } | null;
  saleCount: number;
  rating: number;
  description: string;
  createdAt: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = [
    "all",
    "Electronics",
    "Fashion",
    "Accessories",
    "Home",
    "Gaming",
  ];

  const categoryQuery = searchParams.get("category") || "all";
  const sortQuery = searchParams.get("sort") || "relevance";
  const limit = 12;
  const searchQuery = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const filter = {
    q: searchQuery,
    page: page,
    category: categoryQuery,
    sort: sortQuery,
    limit: limit,
  };

  const { data, isLoading, error } = useProduct(filter);
  const totalPages = data?.totalPages || 1;

  console.log("Products Data:", data);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "All" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key !== "page") {
      params.set("page", "1");
    }
    router.push(`/products?${params.toString()}`);
  };
  return (
    <div className="mx-auto max-w-7xl mt-5 mb-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-900 uppercase text-xl sm:text-2xl md:text-3xl font-bold">
            OUR COLLECTION
          </p>
          <p className="mt-1 text-slate-500 font-small md:font-medium">
            {isLoading ? "Loading collection..." : `Showing ${data?.total || 0} Premium Products`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal />
                  Sort By
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => updateQuery("sort","lowest")}>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateQuery("sort","highest")}>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateQuery("sort","newest")}>Newest Arrivals</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateQuery("sort","oldest")}>Oldest Arrivals</DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateQuery("sort","relevance")}>Clear Filter</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal />
                  Category
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {category.map((cat) => (
                  <DropdownMenuItem key={cat} onClick={() => updateQuery("category", cat.toLowerCase())}>
                    <DropdownMenuLabel>{cat}</DropdownMenuLabel>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="border-b mt-3"></div>
      <div className="flex items-start gap-10 mt-10">
        <div className="hidden md:flex flex-col gap-10 h-auto w-50">
          <div className="font-bold text-gray-700">Category</div>
          <div className="flex flex-col space-y-6">
            {category.map((cat) => (
              <li key={cat} className="list-none">
                <button
                  className={`cursor-pointer  font-semibold ${categoryQuery === cat.toLowerCase() ? "text-black underline underline-offset-8" : "text-gray-500"}`}
                  onClick={() => updateQuery("category", cat.toLowerCase())}
                >
                  {cat}
                </button>
              </li>
            ))}
          </div>
        </div>
        {isLoading ? (
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="relative aspect-square w-full rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse mt-1" />
                <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div>Error loading products.</div>
        ) : data.total === 0 ?(
          <div className="font-bold text-slate-500 text-xl flex flex-col gap-2 items-center justify-center w-full h-64 sm:text-2xl md:text-4xl">
            <PackageSearch className="w-8 h-8 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
            <div>No Product Found</div>
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center justify-center">
              {data?.products.map((product: Product, index: number) => (
                <div key={product._id}>
                  <div className="relative group aspect-square w-full overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      priority={index < 4}
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                      className="object-cover rounded-lg transition-transform duration-500 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg cursor-pointer"
                        onClick={() => router.push(`/products/${product._id}`)}
                      >
                        <Eye />
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full shadow-lg cursor-pointer"
                      >
                        <ShoppingCart />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm">{product.name}</h3>
                    <p className="text-sm font-bold">₹{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center gap-5 mt-10">
              <Button
                disabled={page <= 1}
                variant="outline"
                className="cursor-pointer"
                onClick={() => updateQuery("page", (page - 1).toString())}
              >
                Prv
              </Button>
              <p>
                Page {page} of {totalPages}
              </p>
              <Button
                disabled={page >= totalPages}
                variant="outline"
                className="cursor-pointer"
                onClick={() => updateQuery("page", (page + 1).toString())}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
