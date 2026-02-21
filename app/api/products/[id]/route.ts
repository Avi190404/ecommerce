import { connectToDB } from "@/lib/db";
import esClient from "@/lib/elasticsearch";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { updateProductSchema } from "@/types/productType";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}: { params : {id: string}}) {
    try{
        const { id } = await params;
        const cacheKey = `Product_${id}`
        const cacheProduct = await redisClient.get(cacheKey)

        if (cacheProduct) {
            const productObject = typeof cacheProduct === "string" 
                ? JSON.parse(cacheProduct) 
                : cacheProduct;

            return NextResponse.json(productObject);
        }

        await connectToDB()
        const product = await PRODUCT.findById(id).lean()
        if(!product){
            return NextResponse.json({Meg: "No Product Found"}, {status: 404})
        }
        await redisClient.set(cacheKey, JSON.stringify(product), { ex: 300 });
        return NextResponse.json(product)
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}

export async function PATCH(req:NextRequest, {params}: { params : {id: string}}) {
    try{
        const { id } = await params;
        const body = await req.json()
        const result = updateProductSchema.safeParse(body)
        if(!result.success){
            return NextResponse.json({Msg: result.error.issues[0].message}, {status: 400})
        }

        await connectToDB()
        const updateProduct = await PRODUCT.findByIdAndUpdate(id, result.data, { new: true }).lean()
        if(!updateProduct){
            return NextResponse.json({Msg: "No Product Found"}, {status: 404})
        }

        await esClient.update({
            index: "products",
            id: id,
            doc: result.data
        }).catch((err: any) => console.error("ES Update Failed:", err))

        await redisClient.del(`Product_${id}`);
        return NextResponse.json({ msg: "Product Updated Successfully", updateProduct });
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}

export async function DELETE(req:NextRequest, {params}: { params : {id: string}}) {
    try{
        const { id } = await params;

        await connectToDB()
        const deleteProduct = await PRODUCT.findByIdAndDelete(id).lean()
        if(!deleteProduct){
            return NextResponse.json({Msg: "No Product Found"}, {status: 404})
        }

        await esClient.delete({
            index: "products",
            id: id,
        }).catch((err: any) => console.error("ES Delete Failed:", err));

        await redisClient.del(`Product_${id}`);
        return NextResponse.json({ msg: "Product Deleted Successfully", deleteProduct });
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}