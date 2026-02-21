import axios from "axios"

export const cartService = {
    getCart: async () => {
        const { data } = await axios.get("/api/cart");
        return data;
    },
    addToCart: async (productId: string, quantity: number) => {
        const { data } = await axios.post("/api/cart", { productId, quantity });
        return data;
    },
    updateCart: async (productId: string, action: "increment" | "decrement" | "remove") => {
        const { data } = await axios.patch("/api/cart", { productId, action });
        return data;
    }
}