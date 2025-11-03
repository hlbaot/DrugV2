import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');
// save post
export const stateSave = async (id: number)   => {
  const res = await axios.post(
    `http://10.243.200.17:5050/posts/${id}/post-save`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
