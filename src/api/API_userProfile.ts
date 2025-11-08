import axios from "axios";
import Cookies from "js-cookie";
import { PostType } from "../interfaces/post";
import { UserPost} from "../interfaces/userProfile";
import { UserProfile, ListFollowing, ListFollowers  } from "../interfaces/userProfile";
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
export const API_ListFollowers = async (username: string): Promise<ListFollowers> => {
  const res = await axios.get(`http://10.243.200.17:5050/follow/${username}/followers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const API_ListFollowing = async (username: string): Promise<ListFollowing> => {
  const res = await axios.get(`http://10.243.200.17:5050/follow/${username}/following`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};


// bài đăng của người dùng
export const API_PostProfile = async (username: string): Promise<UserPost[]> => {
    const res = await axios.get(`http://10.243.200.17:5050/users/profile/${username}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

// cập nhật thông tin profile người dùng
export const API_updateProfile = async (data: any) => {
    const res = await axios.put(
        `http://10.243.200.17:5050/users/profiles/edit`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}

// follow / unfollow user
export const API_Follow = async (id: number) => {
    const res = await axios.post(
        `http://10.243.200.17:5050/follow/${id}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const API_Unfollow = async (id: number) => {
    const res = await axios.delete(
        `http://10.243.200.17:5050/follow/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};
