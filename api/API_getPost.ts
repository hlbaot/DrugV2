// api.ts

import axios from 'axios';
import { PostType } from '../components/postFeed';

export const getAllPosts = async () => {
    try {
        const res = await axios.get<PostType[]>(`API_AllPost`);
        return res.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách bài viết:', error);
        throw error;
    }
};
