"use client"

import { authService } from "@/services/AuthService"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export function useSignUp(user: { username: string, email: string, password: string }) {
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: () => authService.register(user),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
            router.push("/")
        }
    })
}

export function useSignIn(user: { email: string, password: string }){
    const queryClient = useQueryClient()
    const router = useRouter()
    return useMutation({
        mutationFn: () => authService.logIn(user),
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
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