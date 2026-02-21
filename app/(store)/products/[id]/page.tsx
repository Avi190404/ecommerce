"use client";

import { Badge } from "@/components/ui/badge";
import { useProductById } from "@/hooks/useProduct";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useState } from "react";

export default function ProductPage(){
  const params = useParams()
  const { id } = params;

  const {data: product, isLoading, error } = useProductById(id as string)
  console.log(product)
  const [image, setImage] = useState<string | null>(null);
  if(isLoading) return <div>Loading...</div>
  const mainImage = image || product?.data.images[0];

  
  
  return(
    <div className="w-full h-auto flex items-center justify-center p-10">
      <div className="flex flex-col md:flex-row gap-5 max-w-10/12 w-full border rounded-2xl p-5">
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="relative aspect-square w-full max-w-100 overflow-hidden rounded-xl bg-slate-100">
            <Image src={mainImage} alt="Product Image" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
          </div>
          <div className="flex gap-4 mt-4 overflow-x-auto pb-2 snap-x snap-mandatory">
            {product?.data.images.map((img : string, index:any) => (
              <div key={index} className="relative aspect-square w-24 flex-shrink-0 snap-start overflow-hidden rounded-xl bg-slate-100 cursor-pointer border-2 transition-all" onClick={() => setImage(img)} >
                <Image src={img} alt={`Product Image ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px"/>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div>
            <div>{product?.data.category.map((cat: string) => (<Badge key={cat} variant="secondary">{cat}</Badge>))}</div>
            <div>
              <h1 className="text-4xl font-bold">{product?.data.name}</h1>
            </div>
            <p>{product?.data.description}</p>
            <p>${product?.data.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}