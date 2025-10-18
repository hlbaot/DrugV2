import axios from 'axios';
import Cookies from 'js-cookie';
// delete post
export const API_deletePost = async (postId: string) => {
    const token = Cookies.get('token');
    if (!token) throw new Error('Không tìm thấy token');
    await axios.delete(`http://10.243.200.17:5050/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};