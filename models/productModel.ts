import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        index: true
    },
    description:{
        type: String,
        required: true,
        index: true
    },
    price:{
        type: Number,
        required: true,
        index: true
    },
    category:[{
        type: String,
        required: true,
        index: true
    }],
    images: [{type: String}],
    stock: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviewNum: {
        type: Number,
        default: 0
    },
    saleCount:{
        type:Number,
        default:0
    }
} , { timestamps: true })

const PRODUCT = mongoose.models.Product || mongoose.model("Product", productSchema);
export default PRODUCT;