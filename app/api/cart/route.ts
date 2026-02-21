import { getUserIdFromToken } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import CART from "@/models/cartModel";
import PRODUCT from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

interface CartItem {
  product: string;
  quantity: number;
  amount: number;
}

export async function GET(req: NextRequest){
    try{
        const userId = getUserIdFromToken(req);
        if(!userId){
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
        }
        await connectToDB();
        const cart = await CART.findOne({ user: userId }).populate("item.product");
        if(!cart){
            return NextResponse.json({ msg: "Cart not found" }, { status: 404 })
        }
        return NextResponse.json({ cart }, { status: 200 });
    }catch(err){
        console.log(err)
        return NextResponse.json({ msg: "Error fetching cart" }, { status: 500 });
    }
}

export async function POST(req: NextRequest){
    try{
        const userId = getUserIdFromToken(req);
        if(!userId){
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 })
        }
        
        const { productId, quantity } = await req.json();
        await connectToDB();
        const product = await PRODUCT.findById(productId);
        if(!product){
            return NextResponse.json({ msg: "Product not found" }, { status: 404 })
        }

        let cart = await CART.findOne({ user: userId });
        if(!cart){
            cart = await CART.create({
                user: userId,
                item: [{
                    product: productId,
                    quantity,
                    amount: product.price
                }],
                totalAmount: product.price * quantity
            })
        }else{
            const exsistItemIndex = cart.item.findIndex((i: CartItem) => i.product.toString() === productId);
            if(exsistItemIndex > -1){
                cart.item[exsistItemIndex].quantity += quantity;
            }else{
                cart.item.push({
                    product: productId,
                    quantity,
                    amount: product.price
                })
            }
            cart.markModified('item');
            await cart.save();
        }

        return NextResponse.json({ msg: "Cart updated successfully", cart }, { status: 200 });
        
    }catch(err){
        console.log(err)
        return NextResponse.json({ msg: "Error adding to cart" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest){
    try{
        const userId = getUserIdFromToken(req);
        if(!userId){
            return new Response("Unauthorized", {status: 401})
        }
        const { productId, action } = await req.json();

        await connectToDB();
        const cart = await CART.findOne({ user: userId });
        if(!cart){
            return new Response("Cart not found", {status: 404})
        }

        const itemIndex = cart.item.findIndex((i: CartItem) => i.product.toString() === productId);
        if(itemIndex === -1){
            return NextResponse.json({ msg: "Product not in cart" }, { status: 404 })
        }
        
        if(action === "increment"){
            cart.item[itemIndex].quantity += 1;
        }else if(action === "decrement"){
            if(cart.item[itemIndex].quantity > 1){
                cart.item[itemIndex].quantity -= 1;
            }else{
                cart.item.splice(itemIndex, 1);
            }
        }else if(action === "remove"){
            cart.item.splice(itemIndex, 1);
        }else{
            return NextResponse.json({ msg: "Invalid action" }, { status: 400 });
        }
        cart.markModified('item');
        await cart.save();
        return NextResponse.json({ msg: "Cart updated successfully", cart }, { status: 200 });
    }catch(err){
        console.log(err)
        return NextResponse.json({ msg: "Error updating cart" }, { status: 500 });
    }
}