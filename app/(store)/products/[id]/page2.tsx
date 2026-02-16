"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ShoppingCart, 
  Package, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Edit3
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// --- HARDCODED TEST DATA ---
const TEST_PRODUCT = {
  _id: "test-sony-xm5",
  name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
  description: "Industry-leading noise canceling with two processors controlling 8 microphones. Magnificent Sound, engineered to perfection with the new Integrated Processor V1. Crystal clear hands-free calling with 4 beamforming microphones and advanced audio signal processing.",
  price: 29990,
  stock: 45,
  rating: 4.8,
  saleCount: 1240,
  category: ["Electronics", "Audio", "Wireless", "Premium"],
  images: [
    "https://images.unsplash.com/photo-1670057037306-033620fe3941", 
    "https://images.unsplash.com/photo-1670057037190-77a83d4760e3", 
    "https://images.unsplash.com/photo-1670057037419-f55928816828"
  ],
  specs: [
    { label: "Battery Life", value: "Up to 30 hours" },
    { label: "Charging", value: "USB-C (Fast charge 3 min = 3 hours)" },
    { label: "Driver", value: "30mm specially designed" },
    { label: "Bluetooth", value: "Version 5.2" }
  ]
}

export default function ProductViewPage() {
  const [selectedImage, setSelectedImage] = useState(TEST_PRODUCT.images[0])
  const product = TEST_PRODUCT

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-8">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" asChild className="hover:bg-transparent p-0">
            <Link href="/admin/products" className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to Inventory
            </Link>
          </Button>
          <Button variant="outline" className="rounded-lg gap-2 border-slate-200">
            <Edit3 className="h-4 w-4" /> Edit Product
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Left: Interactive Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
              <Image 
                src={selectedImage} 
                alt={product.name} 
                fill 
                className="object-contain p-8"
                priority
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all bg-slate-50 ${
                    selectedImage === img ? "border-black scale-105 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content & Pricing */}
          <div className="flex flex-col h-full space-y-6">
            <div className="space-y-3">
              <div className="flex gap-2">
                {product.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="bg-slate-100 text-slate-600 border-none font-medium px-3 py-0.5">
                    {cat}
                  </Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-md text-sm font-bold">
                  <Star className="h-4 w-4 fill-current" /> {product.rating}
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500 text-sm font-medium">{product.saleCount} Items sold</span>
              </div>
            </div>

            <div className="text-4xl font-black text-slate-900 italic tracking-tighter">
              ₹{product.price.toLocaleString("en-IN")}
            </div>

            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 border-slate-100 bg-slate-50/50 shadow-none">
                <div className="flex items-center gap-3 text-slate-600 mb-1">
                  <Package className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Stock</span>
                </div>
                <p className="text-lg font-bold text-slate-900">{product.stock} Units</p>
              </Card>
              <Card className="p-4 border-slate-100 bg-slate-50/50 shadow-none">
                <div className="flex items-center gap-3 text-slate-600 mb-1">
                  <Truck className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Delivery</span>
                </div>
                <p className="text-lg font-bold text-slate-900">Surat, IN</p>
              </Card>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1 bg-black text-white h-14 text-lg rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Order
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-slate-100">
                <div className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
                    <ShieldCheck className="h-5 w-5" /> 1 Year Warranty
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase text-slate-400 border-x border-slate-100">
                    <RotateCcw className="h-5 w-5" /> 7 Day Return
                </div>
                <div className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase text-slate-400">
                    <Truck className="h-5 w-5" /> Free Shipping
                </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
           <h3 className="text-xl font-bold mb-6 uppercase tracking-tight">Technical Specifications</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {product.specs.map((spec, i) => (
                <div key={i} className="flex justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500 font-medium">{spec.label}</span>
                  <span className="text-slate-900 font-bold">{spec.value}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}