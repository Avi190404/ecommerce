import { connectToDB } from "@/lib/db";
import CART from "@/models/cartModel";
import ORDER from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


export async function POST(req: NextRequest){
    try{
        await connectToDB()
        const { shippingAddress, contact, userId } = await req.json();
        const userCart = await CART.findOne({ user: userId }).populate("item.product");

        if (!userCart || userCart.item.length === 0) {
            return NextResponse.json({ msg: "Cart is empty" }, { status: 400 });
        }

        const orderItems = userCart.item.map((i: any) => ({
            name: i.product.name,
            qty: i.quantity,
            price: i.product.price,
            product: i.product._id,
        }));
        const amount = Math.round(userCart.totalAmount * 100); 
        const razorpayOrder = await razorpay.orders.create({
            amount,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        });

        const newOrder = await ORDER.create({
            user: userId,
            orderItems,
            shippingAddress,
            paymentMethod: "Razorpay",
            totalPrice: userCart.totalAmount,
            isPaid: false,
        });
        return NextResponse.json({
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            mongoOrderId: newOrder._id,
        });
    }catch(err){
        console.error("Checkout Error:", err);
        return NextResponse.json({ msg: "Server Error" }, { status: 500 });
    }
}