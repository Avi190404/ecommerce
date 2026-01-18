import esClient from "@/lib/elasticsearch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try{
        const { searchParams } = new URL(req.url);

        const query = searchParams.get("q")
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 10;
        const category = searchParams.get("category") || "all";
        const sort = searchParams.get("sort") || "newest";
        const minPrice = searchParams.get("min") || "0";
        const maxPrice = searchParams.get("max") || "max"

        if(!query){
            return NextResponse.json({Msg: "Search Query is Required"}, {status: 400})
        }

        const skip = (page - 1)  * limit;

        const esBody: any = {
            from: skip,
            size: limit,
            query: {
                bool: {
                    must: [{
                        multi_match: {
                            query: query,
                            fields: ["name^3", "description", "category"],
                            fuzziness: "AUTO"
                        }
                    }],
                    filter:[]
                }
            },
            Highlight:{
                fields:{
                    name: {},
                    description:{}   
                }
            }
        };

        if (category && category !== "all") {
            esBody.query.bool.filter.push({ term: { "category.keyword": category } });
        }

        if (minPrice !== "0" || maxPrice !== "max") {
            const rangeQuery: any = { price: { gte: Number(minPrice) } };
            if (maxPrice !== "max") rangeQuery.price.lte = Number(maxPrice);
            esBody.query.bool.filter.push({ range: rangeQuery });
        }

        const result = await esClient.search({
            index: "products",
            body: esBody
        });

        const products = result.hits.hits.map((hit: any) => ({
            _id: hit._id,
            ...hit._source,
            score: hit._score,
            highlights: hit.highlight
        }))

        return NextResponse.json({products, total: result.hits.total,currentPage: page})

    }catch(err){
        console.log(err)
        return NextResponse.json({Msg: "Internal Server Error"}, {status: 500})
    }
}