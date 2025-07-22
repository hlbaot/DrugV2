import axios from 'axios';
import { PostType } from '../interfaces/post';

export const getAllPosts = async (): Promise<PostType[]> => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');

    const res = await axios.get('http://10.243.200.17:5050/api/posts', {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data.data as PostType[];
};
