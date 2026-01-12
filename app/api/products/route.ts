import { connectToDB } from "@/lib/db";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        const cacheKey = "all_products_list";
        const cacheData = await redisClient.get(cacheKey);
        if(cacheData){
            console.log("Sendind Data From Redis")
            return NextResponse.json(cacheData)
        }

        await connectToDB()
        const product = PRODUCT.find().lean();
        await redisClient.set(cacheKey, JSON.stringify(product), { ex: 3600 })
        console.log("Sending Data From Database")
        return NextResponse.json(product);
    }catch(err){
        console.log(err);
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}