import axios from "axios"

export const authService = {
    register: async (user: { username: string, email: string, password: string }) => {
        const { data } = await axios.post("/api/register", user)
        return data;
    },
    
    logIn: async (user: { email: string, password: string }) => {
        const { data } = await axios.post("/api/signin", user)
        return data;
    },
    logOut: async () => {
        const { data } = await axios.post("/api/logout")
        return data;
    }
}