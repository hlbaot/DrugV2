import axios from "axios";
import Cookies from "js-cookie";
import { CommentType, PostType } from "@/src/interfaces/post";
import { API } from "./api";

const token = Cookies.get('token');
export const getAllPosts = async (): Promise<PostType[]> => {
    const res = await axios.get(`${API}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.posts;
};

// lay comment theo postId
export const getCommentsPostId = async (id: number): Promise<CommentType[]> => {
  const res = await axios.get(
    `${API}/comments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.comments ;
};