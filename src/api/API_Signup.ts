import axios from "axios";
import { API } from "./api";

export const API_SignUp = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API}/users/register`, data);
  return res.data;
};
