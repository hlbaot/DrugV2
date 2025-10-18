// API_SignUp.ts
import axios from "axios";

export const API_SignUp = async (data: { email: string; password: string }) => {
  const res = await axios.post("http://10.243.200.17:5050/users/register", data);
  return res.data;
};
