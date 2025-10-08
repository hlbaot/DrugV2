import axios from "axios";
import Cookies from "js-cookie";
import { UserProfile } from "@/interfaces/userProfile";

export const getUserProfile = async (username: string): Promise<UserProfile> => {
    const token = Cookies.get('token');
    const res = await axios.get(`http://10.243.200.17:5050/users/profiles/${username}`, {
         headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
