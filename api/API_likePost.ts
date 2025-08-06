import axios from "axios";
//like
export const likePost = async (postId: number) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  await axios.post(
    `http://10.243.200.17:5050/api/posts/${postId}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
//unlike
export const unlikePost = async (postId: number) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  await axios.delete(`http://10.243.200.17:5050/api/posts/${postId}/like`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
