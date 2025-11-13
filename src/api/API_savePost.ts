import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";

const token = Cookies.get('token');
// save post
export const stateSave = async (id: number)   => {
  const res = await axios.post(
    `${API}/posts/${id}/post-save`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
