import { sampleProducts } from "@/assets/products"
import { DataTable } from "@/components/tables/productDataTable"
import { productColumns } from "@/components/tables/productColumns"
import SearchBar from "@/components/searchBar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default async function DemoPage() {
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
          <SearchBar />
          <Button asChild className="bg-black text-white hover:bg-slate-800 rounded-lg">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <DataTable columns={productColumns} data={sampleProducts} />
      </div>
    </div>
  )
}