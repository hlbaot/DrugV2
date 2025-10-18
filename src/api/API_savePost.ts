import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');
// save post
export const savePost = async (postId: number) => {
  await axios.post(
    `http://10.243.200.17:5050/posts/save/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Bỏ lưu bài post
export const unSavePost = async (postId: number) => {
  await axios.delete(
    `http://10.243.200.17:5050/posts/unsave/${postId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
