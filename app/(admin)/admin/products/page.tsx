"use client"

import { useEffect, useState } from "react";
import { DataTable } from "@/components/tables/productDataTable"
import { productColumns } from "@/components/tables/productColumns"
import SearchBar from "@/components/searchBar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useProduct } from "@/hooks/useProduct"

export default function products() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [ debounceSearch, setDebounceSearch ] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(searchQuery);
      setPage(1);
    },500)
    return () => clearTimeout(timer);
  },[searchQuery])

  const filters = {
    q: debounceSearch,
    page: page || 1,
    category: "",
    sort: ""
  }

  const { data, isLoading, error } = useProduct(filters)

  const totalPages = data?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
            Products
          </h1>
          <p className="text-sm text-slate-500">
            Manage your inventory and product listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar value={searchQuery} onChange={(e: any) => setSearchQuery(e.target.value)} />
          <Button asChild className="bg-black text-white hover:bg-slate-800 rounded-lg">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="p-4 text-center text-sm text-slate-500">Loading...</div>
        ) : error ? (
          <div className="p-4 text-center text-sm text-red-500">Error loading products.</div>
        ) : (
          <DataTable columns={productColumns} data={data?.products || []} />
        ) }
      </div>
      <div className="flex items-center justify-center gap-5 mr-10">
        <Button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>
          Previous
        </Button>
        <div>{page}</div>
        <Button disabled={page === totalPages} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}  >
          Next
        </Button>
      </div>
    </div>
  )
}