import { connectToDB } from "@/lib/db";
import esClient from "@/lib/elasticsearch";
import PRODUCT from "@/models/productModel";
import { faker } from "@faker-js/faker";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await connectToDB();
        let successCount = 0;

        const CATEGORIES = ["Electronics", "Footwear", "Photography", "Computing", "Gaming"];

        console.log("🚀 Starting Seed: Creating 100 unique products...");

        for (let i = 0; i < 100; i++) {
            const category = faker.helpers.arrayElement(CATEGORIES);
            const name = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`;
            
            const productType = name.split(" ").pop();

            const images = Array.from({ length: 4 }).map((_, idx) => {
                return `https://images.unsplash.com/photo-1?auto=format&fit=crop&w=800&q=80&${productType}&sig=${i}-${idx}`;
            });

            const productData = {
                name: name,
                description: faker.commerce.productDescription(),
                price: parseFloat(faker.commerce.price({ min: 50, max: 2500 })),
                category: [category],
                images: images,
                stock: faker.number.int({ min: 0, max: 150 }),
                rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
                reviewNum: faker.number.int({ min: 0, max: 1000 }),
                saleCount: faker.number.int({ min: 0, max: 5000 })
            };

            const newProduct = await PRODUCT.create(productData);

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
            if (successCount % 10 === 0) {
                console.log(`✅ Progress: ${successCount}/100 items synced.`);
            }
        }

        return NextResponse.json({ 
            Msg: "Deep Seed Successful", 
            total: successCount,
            status: "Synced with MongoDB & Elasticsearch" 
        }, { status: 201 });

    } catch (err) {
        console.error("Critical Seed Error:", err);
        return NextResponse.json({ 
            Msg: "Internal Server Error", 
            error: err instanceof Error ? err.message : "Unknown error" 
        }, { status: 500 });
    }
}