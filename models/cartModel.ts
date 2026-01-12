import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    item: [{
        product: {
            type: mongoose.Schema.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    totalAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true } )

const CART = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default CART;