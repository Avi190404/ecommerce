import esClient from "@/lib/elasticsearch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const query = searchParams.get("q") || "";
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 10;
        const category = searchParams.get("category") || "all";
        const sort = searchParams.get("sort") || "relevance";
        const minPrice = searchParams.get("min") || "0";
        const maxPrice = searchParams.get("max") || "max";

        const skip = (page - 1) * limit;

        const searchLogic = query 
            ? {
                multi_match: {
                    query: query,
                    fields: ["name^3", "description", "category"],
                    type: "best_fields",
                    fuzziness: 2,
                    prefix_length: 0,
                    max_expansions: 50
                }
            }
            : { match_all: {} };

        const esBody: any = {
            from: skip,
            size: limit,
            query: {
                bool: {
                    must: [searchLogic],
                    filter: []
                }
            },
            sort: [],
            highlight: query ? {
                fields: { name: {}, description: {} }
            } : undefined
        };

        if (sort === "lowest") esBody.sort.push({ price: "asc" });
        else if (sort === "highest") esBody.sort.push({ price: "desc" });
        else if (sort === "newest") esBody.sort.push({ createdAt: "desc" });
        else if (sort === "oldest") esBody.sort.push({ createdAt: "asc" });
        else esBody.sort.push({ _score: "desc" });

        if (category && category !== "all") {
            esBody.query.bool.filter.push({ term: { "category.keyword": category } });
        }

        if (minPrice !== "0" || maxPrice !== "max") {
            const rangeQuery: any = { price: { gte: Number(minPrice) } };
            if (maxPrice !== "max") rangeQuery.price.lte = Number(maxPrice);
            esBody.query.bool.filter.push({ range: rangeQuery });
        }

        const response: any = await esClient.search({
            index: "products",
            body: esBody
        });

        const result = response.body || response;
        
        if (!result.hits) {
            console.warn("Elasticsearch returned no hits object:", result);
            return NextResponse.json({ 
                products: [], 
                total: 0,
                currentPage: page, 
                totalPages: 0 
            });
        }

        const hits = result.hits.hits || [];
        const totalValue = result.hits.total;
        const total = typeof totalValue === 'object' ? totalValue.value : (totalValue || 0);

        const products = hits.map((hit: any) => ({
            _id: hit._id,
            ...hit._source,
            score: hit._score,
            highlights: hit.highlight || null
        }));

        return NextResponse.json({ 
            products, 
            total, 
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (err: any) {
        console.error("Elasticsearch Error Details:", err);
        
        if (err.meta?.body?.error?.type === 'index_not_found_exception') {
            return NextResponse.json({ products: [], total: 0, currentPage: 1, totalPages: 0 });
        }

        return NextResponse.json({ Msg: "Internal Server Error", Error: err.message }, { status: 500 });
    }
}