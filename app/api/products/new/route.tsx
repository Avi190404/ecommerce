import { connectToDB } from "@/lib/db";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const catcheProducts = await redisClient.get("newProducts")
        if(catcheProducts){
            const productsObject = typeof catcheProducts === "string" 
                ? JSON.parse(catcheProducts) 
                : catcheProducts;
            return NextResponse.json(productsObject,{status: 200});
        }
        
        await connectToDB();
        const newProducts = await PRODUCT.find().sort({ createdAt: -1}).limit(4).lean()
        if(!newProducts){
            return NextResponse.json({Msg: "No Product Found"}, {status: 404})
        }
        await redisClient.set("newProducts", JSON.stringify(newProducts), { ex: 300 });
        return NextResponse.json(newProducts,{status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}