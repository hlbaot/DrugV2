import axios from 'axios';
import Cookies from 'js-cookie';
// delete post
export const API_deletePost = async (id: string) => {
    const token = Cookies.get('token');
    await axios.delete(`http://10.243.200.17:5050/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};