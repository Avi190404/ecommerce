import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(3, "Name Must be at leaste 3 character"),
    email: z.string().email("Enter Proper Mail"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
})

export const signinSchema = z.object({
    email: z.string().email("Enter Proper Mail"),
    password: z
        .string()
        .min(6, "Passweord must be at at leaste 6 character Long")
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
})
