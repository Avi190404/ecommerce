import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectToDB } from "@/lib/db";
import CART from "@/models/cartModel";
import ORDER from "@/models/orderModel";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature, 
      mongoOrderId,
      userId 
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await ORDER.findByIdAndUpdate(mongoOrderId, {
        isPaid: true,
        paidAt: new Date(),
      });

      await CART.findOneAndUpdate(
        { user: userId }, 
        { item: [], totalAmount: 0 }
      );

      return NextResponse.json({ msg: "Payment Successful" });
    } else {
      return NextResponse.json({ msg: "Invalid Signature" }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ msg: "Verification Failed" }, { status: 500 });
  }
}