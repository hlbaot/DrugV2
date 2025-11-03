import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get('token');
//like / unlike
export const stateLike = async (id: number) => {
  const res = await axios.post(
    `http://10.243.200.17:5050/posts/${id}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
