import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function GET() {
    const timestamp = Math.round(new Date().getTime() / 1000)
    const sign = cloudinary.utils.api_sign_request({timestamp, folder: "Product"}, process.env.CLOUDINARY_API_SECRET as string)

    return NextResponse.json({sign, timestamp})
}