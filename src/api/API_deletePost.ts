import axios from 'axios';
import Cookies from 'js-cookie';
import { API } from './api';
// delete post
export const API_deletePost = async (id: string) => {
    const token = Cookies.get('token');
    await axios.delete(`${API}/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};