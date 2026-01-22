import { connectToDB } from "@/lib/db";
import PRODUCT from "@/models/productModel";
import esClient from "@/lib/elasticsearch";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await connectToDB();

        console.log("⚠️ Starting full database cleanup...");

        // 1. Delete all products from MongoDB
        const mongoResult = await PRODUCT.deleteMany({});
        console.log(`✅ MongoDB: Deleted ${mongoResult.deletedCount} products.`);

        // 2. Delete the entire Index from Elasticsearch (Bonsai)
        // This is faster and cleaner than deleting documents one by one
        try {
            await esClient.indices.delete({
                index: "products",
                // ignore_unavailable: true prevents error if the index doesn't exist yet
                ignore_unavailable: true 
            });
            console.log("✅ Elasticsearch: 'products' index deleted.");
        } catch (esErr) {
            console.error("ES Delete Error:", esErr);
        }

        return NextResponse.json({
            message: "Cleanup Successful",
            mongoDeleted: mongoResult.deletedCount,
            status: "Database and Search Index cleared"
        });

    } catch (err) {
        console.error("Cleanup Route Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}