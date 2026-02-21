import { NextRequest } from "next/server";

export default async function POST(req: NextRequest){
    try{
        const { items, userId } = await req.json();
        
    }catch(err){
        console.log(err)
        return new Response("Error adding to cart", {status: 500})
    }
}