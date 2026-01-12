import { connectToDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    try{
        const body = await req.json()
        await connectToDB()
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}