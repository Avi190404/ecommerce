import { connectToDB } from "@/lib/db";
import { redisClient } from "@/lib/redis";
import PRODUCT from "@/models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
    try{
        await connectToDB()
        const product = PRODUCT.find().lean();
        console.log("Sending Data From Database")
        return NextResponse.json(product);
    }catch(err){
        console.log(err);
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}