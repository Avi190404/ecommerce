import { connectToDB } from "@/lib/db";
import esClient from "@/lib/elasticsearch";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"

const productSchema = z.object({
    name: z.string().min(5, "name Must be at least 5 character"),
    description: z.string().min(10, "name Must be at least 10 character"),
    price: z.number().positive("Price Must Be Positive Value"),
    category: z.array(z.string().min(3,"Category Must at least 5 character")),
    images: z.array(z.string().url()).min(1,"Image Must Have Atleast One Proper Url"),
    stock: z.number().int().nonnegative("Stock Can not Be negative")
})

export async function POST(req:NextRequest) {
    try{
        const body = await req.json()
        const result = productSchema.safeParse(body)
        if(!result.success){
            return NextResponse.json({ msg: result.error.issues[0].message }, { status: 400 })
        }
        const product = result.data;

        await connectToDB()
        const newProduct = await PRODUCT.create(product)

        await esClient.index({
            index: "products",
            id: newProduct._id.toString(),
            document:{
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                images: product.images,
            }
        })
        await redisClient.del("all_products_list")

        return NextResponse.json({Msg: "New Product Created Successfully", newProduct}, {status: 201})
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}