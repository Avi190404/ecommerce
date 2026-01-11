import { connectToDB } from '@/lib/db'
import USER from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { stat } from 'fs';

const signinSchema = z.object({
    email: z.string().email("Enter Proper Mail"),
    password: z
        .string()
        .min(6, "Passweord must be at at leaste 6 character Long")
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
})

export async function POST(req:NextRequest) {
    try{
        const body = await req.json()
        const result = signinSchema.safeParse(body)
        if(!result.success){
            return NextResponse.json({msg: result.error.issues[0].message }, { status: 400 })
        }
        let { email, password } = result.data;

        await connectToDB();

        const user = await USER.findOne({ email })
        if(!user){
            return NextResponse.json({Msg: "Invalid email or password"}, {status: 400})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return NextResponse.json({ Msg: "Invalid email or password"}, {status: 400})
        }

        const userObject = user.toObject();

        let { password:_, ...User} = userObject

        const token = jwt.sign(User, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        const response = NextResponse.json({ msg: "User Login Successfull", User }, { status: 200 })

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    }catch(err){
        console.log(err)
        return NextResponse.json({msg: "Internal Server Error"}, {status: 500})
    }
}

export async function GET( req:NextRequest ) {
    try{
        const token = req.cookies.get("token")?.value
        if(!token){
            return NextResponse.json({Msg: "No Auth Token"}, { status: 401 })
        }
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET as string) as any
        return NextResponse.json({ msg: "User authenticated"}, { status: 200 });

    }catch(err){
        console.log(err)
        return NextResponse.json({Msg : "Internal Server Error"}, {status: 500})
    }
}