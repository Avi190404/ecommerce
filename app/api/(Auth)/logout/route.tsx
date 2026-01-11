import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        const response = NextResponse.json({ Msg: "LogOut Successfull" }, {status: 200})
        response.cookies.delete("token")
        return response;
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}