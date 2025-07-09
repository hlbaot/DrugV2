import axios from "axios";

const API_SignIn = (data: { email: string; password: string }) => {
  return axios.post("/api/login", data);
};

export default API_SignIn;
