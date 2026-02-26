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

export async function GET(req: NextRequest) {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }
        await connectToDB();
        const cart = await CART.findOne({ user: userId }).populate("item.product");
        if (!cart) {
            return NextResponse.json({ cart: { item: [], totalAmount: 0 } }, { status: 200 });
        }
        return NextResponse.json({ cart }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "Error fetching cart" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }

        const { productId, quantity } = await req.json();
        await connectToDB();

        const product = await PRODUCT.findById(productId);
        if (!product) {
            return NextResponse.json({ msg: "Product not found" }, { status: 404 });
        }

        let cart = await CART.findOne({ user: userId });

        if (!cart) {
            if (quantity > product.stock) {
                return NextResponse.json({ msg: `Only ${product.stock} units in stock` }, { status: 400 });
            }

            cart = await CART.create({
                user: userId,
                item: [{ product: productId, quantity, amount: product.price }],
            });
        } else {
            const existItemIndex = cart.item.findIndex((i: CartItem) => i.product.toString() === productId);

            if (existItemIndex > -1) {
                const newTotal = cart.item[existItemIndex].quantity + quantity;
                if (newTotal > product.stock) {
                    return NextResponse.json({ 
                        msg: `Stock limit reached. You have ${cart.item[existItemIndex].quantity} in cart and only ${product.stock} are available.` 
                    }, { status: 400 });
                }
                cart.item[existItemIndex].quantity = newTotal;
            } else {
                if (quantity > product.stock) {
                    return NextResponse.json({ msg: `Only ${product.stock} units available` }, { status: 400 });
                }
                cart.item.push({ product: productId, quantity, amount: product.price });
            }
            cart.markModified('item');
            await cart.save();
        }

        return NextResponse.json({ msg: "Cart updated successfully", cart }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "Error adding to cart" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const userId = getUserIdFromToken(req);
        if (!userId) {
            return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
        }
        
        const { productId, action } = await req.json();
        await connectToDB();

        const cart = await CART.findOne({ user: userId });
        if (!cart) {
            return NextResponse.json({ msg: "Cart not found" }, { status: 404 });
        }

        const itemIndex = cart.item.findIndex((i: CartItem) => i.product.toString() === productId);
        if (itemIndex === -1) {
            return NextResponse.json({ msg: "Product not in cart" }, { status: 404 });
        }

        if (action === "increment") {
            const product = await PRODUCT.findById(productId);
            if (!product) return NextResponse.json({ msg: "Product not found" }, { status: 404 });

            if (cart.item[itemIndex].quantity + 1 > product.stock) {
                return NextResponse.json({ msg: "Maximum stock reached" }, { status: 400 });
            }
            cart.item[itemIndex].quantity += 1;
        } 
        else if (action === "decrement") {
            if (cart.item[itemIndex].quantity > 1) {
                cart.item[itemIndex].quantity -= 1;
            } else {
                cart.item.splice(itemIndex, 1);
            }
        } 
        else if (action === "remove") {
            cart.item.splice(itemIndex, 1);
        } 
        else {
            return NextResponse.json({ msg: "Invalid action" }, { status: 400 });
        }

        cart.markModified('item');
        await cart.save();
        return NextResponse.json({ msg: "Cart updated successfully", cart }, { status: 200 });
        
    } catch (err) {
        console.error(err);
        return NextResponse.json({ msg: "Error updating cart" }, { status: 500 });
    }
}