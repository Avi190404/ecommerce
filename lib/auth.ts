import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getUserIdFromToken = (req:NextRequest) => {
    try{
        const token = req.cookies.get("token")?.value
        if(!token){
            console.log("No Auth Token")
            return null;
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as any
        return decodeToken._id;
    }catch(err){
        console.log(err)
        return null;
    }
}