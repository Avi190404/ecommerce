import { cartService } from "@/services/CartService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCart(){
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => cartService.getCart(),
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}

export function useAddToCart(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, quantity }: { productId: string, quantity: number }) => cartService.addToCart(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    })
}

export function useUpdateCart(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ productId, action }: { productId: string, action: "increment" | "decrement" | "remove" }) => cartService.updateCart(productId, action),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    })
}