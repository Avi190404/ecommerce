"use client"

import { authService } from "@/services/AuthService"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export function useCheckAuth() {
    return useQuery({
        queryKey: ['user'],
        queryFn: () => authService.checkAuth(),
        retry: false,
        staleTime: 1000 * 60 * 5,
    })
}

export function useSignUp() {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (user: { name: string, email: string, password: string }) => authService.register(user),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.User);
            router.push("/")
        }
    })
}

export function useSignIn(){
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: (user: { email: string, password: string }) => authService.logIn(user),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data.User);
            router.push("/")
        }
    })
}

export function useLogOut(){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: () => authService.logOut(),
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    })
}