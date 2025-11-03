import axios from "axios";
import Cookies from "js-cookie";
import { UserProfile, ListFollowing, ListFollowers , Postprofile } from "../interfaces/userProfile";
const token = Cookies.get('token');
// get thông tin người dùng
export const API_UserProfile = async (username: string): Promise<UserProfile> => {
    const res = await axios.get(`http://10.243.200.17:5050/users/profiles/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
// get danh sách follower
export const API_ListFollowers = async (username: string): Promise<ListFollowers> => {
    const res = await axios.get(`http://10.243.200.17:5050/follow/${username}/follower`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.follower;
};
// get danh sách following
export const API_ListFollowing = async (username: string): Promise<ListFollowing> => {
    const res = await axios.get(`http://10.243.200.17:5050/follow/${username}/following`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.following;
};
// get bài đăng của người dùng
export const API_PostProfile = async (username: string): Promise<Postprofile> => {
    const res = await axios.get(`http://10.243.200.17:5050/users/profile/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
// cập nhật thông tin pròile người dùng
export const API_updateProfile = async (data: any) => {
    const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}