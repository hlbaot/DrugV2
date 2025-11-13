import axios from "axios";
import { API } from "./api";
import { SignInRequest, SignInResponse } from "../interfaces/auth";

export const API_SignIn = async (values: SignInRequest): Promise<SignInResponse> => {
  const res = await axios.post<SignInResponse>(`${API}/users/login`, values);
  return res.data;
};

