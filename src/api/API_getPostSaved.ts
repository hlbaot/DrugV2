import axios from "axios";
import Cookies from "js-cookie";
import { SavedPostResponse, SavedPostType } from "../interfaces/savedPost";
// get list saved post
export const getAllPostsSaved = async (): Promise<SavedPostType[]> => {
    const token = Cookies.get('token');
    const res = await axios.get<SavedPostResponse>('http://10.243.200.17:5050/users/saved/all-posts', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.posts;
}