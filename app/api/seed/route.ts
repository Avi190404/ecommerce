import { connectToDB } from "@/lib/db";
import esClient from "@/lib/elasticsearch";
import PRODUCT from "@/models/productModel";
import { sampleProducts } from "@/assets/products";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await connectToDB();
        let successCount = 0;

        console.log(`🚀 Starting Seed: Syncing ${sampleProducts.length} verified products...`);

        // Use the actual sampleProducts array instead of random Faker generation
        for (const product of sampleProducts) {
            
            // Check if product already exists to avoid duplicates
            const existingProduct = await PRODUCT.findOne({ name: product.name });
            if (existingProduct) continue;

            // 1. Create in MongoDB
            // Note: MongoDB will generate the _id
            const newProduct = await PRODUCT.create({
                name: product.name,
                description: `High-quality ${product.name} from our ${product.category} collection.`,
                price: product.price,
                category: [product.category],
                images: product.images, // Using the array of images as requested
                stock: product.stock,
                rating: product.rating,
                reviewNum: Math.floor(Math.random() * 500),
                saleCount: Math.floor(Math.random() * 1000)
            });

            // 2. Index in Elasticsearch
            await esClient.index({
                index: "products",
                id: newProduct._id.toString(),
                body: { 
                    name: newProduct.name,
                    description: newProduct.description,
                    price: newProduct.price,
                    category: newProduct.category,
                    images: newProduct.images,
                    rating: newProduct.rating,
                    saleCount: newProduct.saleCount,
                    stock: newProduct.stock,
                    createdAt: newProduct.createdAt
                }
            });

            successCount++;
        }

        return NextResponse.json({ 
            Msg: "Verified Seed Successful", 
            totalSynced: successCount,
            status: "MongoDB & Elasticsearch in sync with frontend samples" 
        }, { status: 201 });

    } catch (err) {
        console.error("Critical Seed Error:", err);
        return NextResponse.json({ 
            Msg: "Internal Server Error", 
            error: err instanceof Error ? err.message : "Unknown error" 
        }, { status: 500 });
    }
}