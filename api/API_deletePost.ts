import axios from 'axios';

export const API_deletePost = async (postId: string) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');
    await axios.delete(`http://10.243.200.17:5050/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};