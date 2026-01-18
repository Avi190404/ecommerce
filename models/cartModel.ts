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
        },
        amount: {
            type: Number,
            required: true,
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true,
        unique: true
    },
    totalAmount: {
        type: Number,
        default: 0
    }
}, { timestamps: true } )

cartSchema.pre('save', async function() {
    this.totalAmount = this.item.reduce((total, i) => {
        return total + (i.amount * i.quantity);
    }, 0);
});

const CART = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default CART;