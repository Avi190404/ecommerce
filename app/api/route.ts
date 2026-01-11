import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({msg: "Server Is running"})
}