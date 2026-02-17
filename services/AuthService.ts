import axios from "axios"

export const authService = {
    checkAuth : async () => {
        const data = await axios.get("/api/me")
        return data;
    },
    register: async (user: { name: string, email: string, password: string }) => {
        const { data } = await axios.post("/api/register", user)
        console.log(data)
        return data;
    },
    
    logIn: async (user: { email: string, password: string }) => {
        const { data } = await axios.post("/api/signin", user)
        console.log(data)
        return data;
    },
    logOut: async () => {
        const { data } = await axios.post("/api/logout")
        return data;
    }
}