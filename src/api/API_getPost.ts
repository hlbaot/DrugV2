import axios from "axios";
import Cookies from "js-cookie";
import { CommentResponse, CommentType, PostType } from "@/src/interfaces/post";

const token = Cookies.get('token');
export const getAllPosts = async (): Promise<PostType[]> => {
    const res = await axios.get('http://10.243.200.17:5050/posts', {
        // withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data.posts;
};

// lay comment theo postId
export const getCommentsPostId = async (id: number): Promise<CommentType[]> => {
  const res = await axios.get<CommentResponse>(
    `http://10.243.200.17:5050/comments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.comments ;
};