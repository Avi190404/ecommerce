import * as z from "zod";

export const authSchema = z.object({
    username: z.string().min(3, "Username Must be at least 3 character").optional(),
    email: z.string().email("Enter Proper Mail"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
        
})