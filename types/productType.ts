import { z } from "zod"

export const productSchema = z.object({
    name: z.string().min(5, "name Must be at least 5 character"),
    description: z.string().min(10, "name Must be at least 10 character"),
    price: z.number().positive("Price Must Be Positive Value"),
    category: z.array(z.string().min(3,"Category Must at least 5 character")),
    images: z.array(z.string().url()).min(1,"Image Must Have Atleast One Proper Url"),
    stock: z.number().int().nonnegative("Stock Can not Be negative")
})

export const updateProductSchema = productSchema.partial()