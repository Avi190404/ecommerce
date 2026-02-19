import axios from "axios"

export const productService = {
    getProducts: async (params: {q?: string,page?:number, category?: string, sort?: string, min?: number, max?: number}) => {
        const { data } = await axios.get("/api/products", { params});
        return data;
    },
    getProductById: async (id: string) => {
        const data = await axios.get(`/api/products/${id}`)
        return data;
    },
    createProduct: async (product: { name: string, description: string, price: number, category: string[], images: string[], stock: number }) => {
        const data = await axios.post("/api/products/add", product)
        return data;
    },
    updateProduct: async (id: string,product: { name?: string, description?: string, price?: number, category?: string[], images?: string[], stock?: number }) => {
        const data = await axios.put(`/api/products/${id}`, product)
        return data;
    },
    deleteProduct: async (id: string) => {
        const data = await axios.delete(`/api/products/${id}`)
        return data;
    },
    newArrivals: async () => {
        const data = await axios.get("/api/products/new")
        return data;
    },
    trending: async () => {
        const data = await axios.get("/api/products/trending")
        return data;
    }
}