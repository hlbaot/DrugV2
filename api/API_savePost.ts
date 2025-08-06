import axios from "axios";

// save post
export const savePost = async (postId: number) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  await axios.post(
    `http://10.243.200.17:5050/api/posts/save/${postId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// Bỏ lưu bài post
export const unSavePost = async (postId: number) => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  await axios.delete(
    `http://10.243.200.17:5050/api/posts/save/${postId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
