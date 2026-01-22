import { connectToDB } from "@/lib/db";
import esClient from "@/lib/elasticsearch";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { productSchema } from "@/types/productType";
import { NextRequest, NextResponse } from "next/server";

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
            body:{
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                images: product.images,
                stock: product.stock
            }
        })

        return NextResponse.json({Msg: "New Product Created Successfully", newProduct}, {status: 201})
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}