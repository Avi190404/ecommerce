"use client";

import { useCart } from "@/hooks/useCart"

export default function CartPage(){
  const { data:cart, isLoading, error } = useCart(); 
  console.log(cart)
  return (
    <div>CartPage</div>
  )
}