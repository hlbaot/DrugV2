import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";

const token = Cookies.get('token');
//like / unlike
export const stateLike = async (id: number) => {
  const res = await axios.post(
    `${API}/posts/${id}/like`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
