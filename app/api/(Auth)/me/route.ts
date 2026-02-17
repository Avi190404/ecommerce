import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest){
    try{
        const token = req.cookies.get("token")?.value
        if(!token){
            return NextResponse.json({Msg: "No Auth Token"}, { status: 401 })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as any
        return NextResponse.json({ msg: "User authenticated", User: decodeToken}, { status: 200 });
    }catch(err){
        console.log(err)
        return NextResponse.json({Msg : "Internal Server Error"}, {status: 500})
    }
}