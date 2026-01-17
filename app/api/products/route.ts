import { connectToDB } from "@/lib/db";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const { searchParams } = new URL(req.url);

        const page = searchParams.get("page") || "1";
        const limit = 10;
        const category = searchParams.get("category") || "all";
        const sort = searchParams.get("sort") || "newest";
        const minPrice = searchParams.get("min") || "0";
        const maxPrice = searchParams.get("max") || "max"
        
        const redisKey = `List:${category}:${sort}:${page}:${minPrice}:${maxPrice}`
        const cachedData= await redisClient.get(redisKey)
        if(cachedData){
            return NextResponse.json(typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData, {status: 200});
        }

        await connectToDB()

        let queary: any = {};
        if(category !== "all"){
            queary.category = category;
        }
        if(maxPrice !== "max"){
            queary.price = { $gte: minPrice, $lte: maxPrice}
        }else{
            queary.price = { $gte: minPrice }
        }
        
        let sortOrder = {}
        if(sort === "newest"){
            sortOrder = {createdAt: -1}
        }else if(sort === "oldest"){
            sortOrder = {createdAt: 1}
        }else if(sort === "lowest"){
            sortOrder = { price: 1 }
        }else if(sort === "higest"){
            sortOrder = { price: -1 }
        }else if(sort === "top"){
            sortOrder = { rating: -1 }
        }

        const skip = (Number(page) - 1) *10

        const product = await PRODUCT.find(queary).sort(sortOrder).skip(skip).limit(limit).lean();
        await redisClient.set(redisKey, JSON.stringify(product), { ex: 120 })
        console.log("Sending Data From Database")
        return NextResponse.json(product);
    }catch(err){
        console.log(err);
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}