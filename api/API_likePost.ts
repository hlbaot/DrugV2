import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');
//like
export const likePost = async (postId: number) => {
  await axios.post(
    `http://10.243.200.17:5050/posts/${postId}/like`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
//unlike
export const unlikePost = async (postId: number) => {
  await axios.delete(`http://10.243.200.17:5050/posts/${postId}/like`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
