import axios from "axios";
import { PostType } from "@/src/interfaces/post";
import Cookies from "js-cookie";
import { API } from "./api";

const getToken = () => Cookies.get('token');

export const API_detailPost = async (id: number): Promise<PostType> => {
  const res = await axios.get(`${API}/posts/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return res.data;
};