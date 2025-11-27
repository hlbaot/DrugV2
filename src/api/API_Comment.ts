import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";
import { CommentType } from "../interfaces/post";   

const token = Cookies.get('token');

export const API_addComment = async (postId: number, content: string): Promise<CommentType> => {
    const res = await axios.post<CommentType>(
        `${API}/comments/add`,
        {
            postId,
            content,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
}