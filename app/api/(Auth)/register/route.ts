import { connectToDB } from '@/lib/db'
import USER from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerSchema = z.object({
    name: z.string().min(3, "Name Must be at at leaste 3 character"),
    email: z.string().email("Enter Proper Mail"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
})

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const result = registerSchema.safeParse(body)
        if (!result.success) {
            return NextResponse.json({ msg: result.error.issues[0].message }, { status: 400 })
        }
        const { name, email, password } = result.data;

        await connectToDB();

        const exsitingUser = await USER.findOne({ email });
        if (exsitingUser) {
            return NextResponse.json({ Msg: "User Already Exsist. Try signIn" }, { status: 409 })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = await USER.create({ name, email, password: hashPassword })

        const userObject = newUser.toObject();
        const { password: _, ...User } = userObject

        const token = jwt.sign(User, process.env.JWT_SECRET as string, { expiresIn: "7d" })

        const response = NextResponse.json({ msg: "user Created Successfully", User }, { status: 201 })

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (err) {
        return NextResponse.json({ error: "internal Server Error" }, { status: 500 })
    }
}