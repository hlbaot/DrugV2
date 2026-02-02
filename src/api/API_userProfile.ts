import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";
import { UserPost } from "../interfaces/userProfile";
import { UserProfile, ListFollowing, ListFollowers } from "../interfaces/userProfile";

// Hàm helper lấy token động
const getToken = () => Cookies.get('token');

// get thông tin người dùng
export const API_UserProfile = async (username: string): Promise<UserProfile> => {
    const res = await axios.get(`${API}/users/profiles/${username}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};
// danh sách người theo dõi và đang theo dõi
export const API_ListFollowers = async (username: string): Promise<ListFollowers> => {
    const res = await axios.get(`${API}/follow/${username}/followers`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

export const API_ListFollowing = async (username: string): Promise<ListFollowing> => {
    const res = await axios.get(`${API}/follow/${username}/following`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};


// bài đăng của người dùng
export const API_PostProfile = async (username: string): Promise<UserPost[]> => {
    const res = await axios.get(`${API}/users/profile/${username}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    return res.data;
};

// cập nhật thông tin profile người dùng
export const API_updateProfile = async (data: any) => {
    const res = await axios.put(
        `${API}/users/profiles/edit`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return res.data;
}

// follow / unfollow user
export const API_Follow = async (id: number) => {
    const res = await axios.post(
        `${API}/follow/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return res.data;
};

export const API_Unfollow = async (id: number) => {
    const res = await axios.delete(
        `${API}/follow/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return res.data;
};

// edit profile
export const API_EditProfile = async (data: any) => {
    const res = await axios.put(
        `${API}/users/profiles/edit`,
        data,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        }
    );
    return res.data;
}