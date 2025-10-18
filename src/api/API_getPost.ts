import axios from 'axios';
import Cookies from 'js-cookie';
import { PostType } from '../interfaces/post';
// get post after user created
export const getAllPosts = async (): Promise<PostType[]> => {
    const token = Cookies.get('token');

    const res = await axios.get('http://10.243.200.17:5050/posts', {
        // withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data.data;
};
