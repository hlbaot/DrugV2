import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";

// save post
export const stateSave = async (id: number) => {
  const token = Cookies.get('token');
  const res = await axios.post(
    `${API}/posts/${id}/post-save`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
