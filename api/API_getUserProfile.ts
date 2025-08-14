import axios from "axios";
import { UserProfile } from "@/interfaces/userProfile";

export const getUserProfile = async () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    const res = await axios.get(`http://10.243.200.17:5050/api/users/profiles`, {
        withCredentials: true,
         headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.data as UserProfile;
};
