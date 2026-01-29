import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";
import { UserProfile } from "../interfaces/userProfile";

const getToken = () => Cookies.get('token');

// Search users by query (username or name)
export const searchUsers = async (query: string): Promise<UserProfile[]> => {
    if (!query) return [];

    // Assuming endpoint: /users/search?query=...
    // Adjust endpoint if backend differs (e.g. /users?search=...)
    try {
        const token = getToken();
        const res = await axios.get(`${API}/users/search?query=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.error("Search error:", error);
        return [];
    }
};
