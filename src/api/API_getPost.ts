import axios from "axios";
import Cookies from "js-cookie";
import { CommentType, PostType } from "@/src/hooks/post";
import { API } from "./api";

export const getAllPosts = async (): Promise<PostType[]> => {
  const token = Cookies.get('token');
  const res = await axios.get(`${API}/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.posts;
};

// lay comment theo postId
export const getCommentsPostId = async (id: number): Promise<CommentType[]> => {
  const token = Cookies.get('token');
  const res = await axios.get(
    `${API}/comments/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.comments;
};