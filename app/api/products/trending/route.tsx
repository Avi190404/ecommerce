import { connectToDB } from "@/lib/db";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const catcheProducts = await redisClient.get("trendingProducts")
        if(catcheProducts){
            const productsObject = typeof catcheProducts === "string" 
                ? JSON.parse(catcheProducts) 
                : catcheProducts;
            return NextResponse.json(productsObject,{status: 200});
        }

        await connectToDB();
        const trending = await PRODUCT.find().sort({ saleCount: -1}).limit(5).lean()
        if(!trending){
            return NextResponse.json({Msg: "No Product Found"}, {status: 404})
        }
        await redisClient.set("trendingProducts", JSON.stringify(trending), { ex: 300 });
        return NextResponse.json(trending,{status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}