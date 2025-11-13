import axios from "axios";
import Cookies from "js-cookie";
import { CreatePostRequest } from "../interfaces/post";
import { API } from "./api";

export const CreatePost = async (data: CreatePostRequest): Promise<void> => {
  const token = Cookies.get('token');

  await axios.post(`${API}/posts/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
