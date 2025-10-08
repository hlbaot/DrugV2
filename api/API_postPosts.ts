import axios from "axios";
import Cookies from "js-cookie";
import { CreatePostRequest } from "@/interfaces/post";

export const CreatePost = async (data: CreatePostRequest): Promise<void> => {
  const token = Cookies.get('token');

  await axios.post("http://10.243.200.17:5050/posts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
