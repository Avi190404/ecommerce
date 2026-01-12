import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    product:{
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    username: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true } )

const REVIEW = mongoose.models.Review || mongoose.model("Review", reviewSchema);
export default REVIEW;