import axios from "axios";
import { SignInRequest, SignInResponse } from "../interfaces/auth";

export const API_SignIn = async (values: SignInRequest): Promise<SignInResponse> => {
  const res = await axios.post<SignInResponse>("http://10.243.200.17:5050/users/login", values);
  return res.data;
};

