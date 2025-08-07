import axios from "axios";
import { SavedPostType } from "@/interfaces/savedPost";
// get list saved post
export const getAllPostsSaved = async (): Promise<SavedPostType[]> => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (!token) throw new Error('Không tìm thấy token');
    const res = await axios.get('http://10.243.200.17:5050/api/posts/posts-saved', {
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.data as SavedPostType[];
}