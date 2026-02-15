"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, SlidersHorizontal, ShoppingCart, Eye, ChevronLeft, ChevronRight, PackageX } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEST_PRODUCTS = Array.from({ length: 18 }).map((_, i) => ({
  _id: `prod-${i + 1}`,
  name: i % 2 === 0 ? "Minimalist Analog Watch" : "Premium Headphones",
  price: i % 2 === 0 ? 4999 : 12499,
  category: i % 3 === 0 ? "electronics" : i % 3 === 1 ? "accessories" : "home",
  image: i % 2 === 0 
    ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500&auto=format&fit=crop" 
    : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500&auto=format&fit=crop",
}));

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const categories = ["All", "Electronics", "Fashion", "Accessories", "Home", "Gaming"];

  // 1. Get current states from URL
  const ITEMS_PER_PAGE = 6;
  const currentPage = parseInt(searchParams.get("page") || "1");
  const categoryFilter = searchParams.get("category") || "all";
  
  // 2. Filter logic: This is why "No Product Found" will show for Fashion/Gaming
  const filteredProducts = TEST_PRODUCTS.filter(p => 
    categoryFilter === "all" ? true : p.category === categoryFilter
  );

  // 3. Pagination math
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 4. URL Update Handler
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "All" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/products?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tighter text-slate-900 uppercase">Our Collection</h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Showing {filteredProducts.length} premium items
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 font-bold">
            <SlidersHorizontal className="mr-2 h-4 w-4" /> Sort By
          </Button>
          <Button variant="outline" size="sm" className="h-10 font-bold lg:hidden">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Categories</h3>
          <ul className="mt-6 space-y-4">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => updateQuery("category", cat.toLowerCase())}
                  className={`text-sm font-bold transition-colors ${
                    categoryFilter === cat.toLowerCase() 
                      ? "text-black underline underline-offset-8" 
                      : "text-slate-500 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Area */}
        <div className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <>
              {/* Product Grid */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {currentProducts.map((product) => (
                  <div key={product._id} className="group relative">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="rounded-full shadow-lg">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</p>
                        <h3 className="mt-1 text-sm font-bold text-slate-900 leading-tight">{product.name}</h3>
                      </div>
                      <p className="text-sm font-black text-slate-900">₹{product.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2 border-t border-slate-100 pt-8">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-bold px-4">Page {currentPage} of {totalPages}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* --- EMPTY STATE --- */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="rounded-full bg-slate-50 p-6 text-slate-300">
                <PackageX size={48} strokeWidth={1} />
              </div>
              <h2 className="mt-6 text-xl font-bold tracking-tighter uppercase text-slate-900">
                No Products Found
              </h2>
              <p className="mt-2 text-slate-500 max-w-xs">
                We couldn't find any items in the <span className="font-bold text-black italic">{categoryFilter}</span> category.
              </p>
              <Button 
                variant="link" 
                className="mt-4 font-bold text-black underline underline-offset-4"
                onClick={() => updateQuery("category", "all")}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}