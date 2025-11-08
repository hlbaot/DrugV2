import axios from "axios";
import { PostType } from "@/src/interfaces/post";
import Cookies from "js-cookie";

const token = Cookies.get('token');
export const API_detailPost = async (id: number): Promise<PostType> => {
  const res = await axios.get(`http://10.243.200.17:5050/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};