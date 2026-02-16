"use client";

import { productService } from "@/services/ProductService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProduct(filters: {q?: string,page?:number, category?: string, sort?: string, min?: number, max?: number, limit?: number}){
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => productService.getProducts(filters),
        staleTime: 5 * 60 * 1000,
    })
}

export function useProductById(id: string){
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => productService.getProductById(id),
        
    })
}

export function useCreateProduct(product: { name: string, description: string, price: number, category: string[], images: string[], stock: number }){
    return useMutation({
        mutationFn:() => productService.createProduct(product),
        onSuccess: () => {
            const queryClient = useQueryClient()
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

export function useUpdateProduct(id: string, product: { name?: string, description?: string, price?: number, category?: string[], images?: string[], stock?: number }){
    return useMutation({
        mutationFn: () => productService.updateProduct(id, product),
        onSuccess: () => {
            const queryClient = useQueryClient()
            queryClient.invalidateQueries({ queryKey: ["products"] })
        }
    })
}

export function useDeleteProduct(id: string){
    return useMutation({
        mutationFn: () => productService.deleteProduct(id),
        onSuccess: () => {
            const queryClient = useQueryClient()
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    })
}