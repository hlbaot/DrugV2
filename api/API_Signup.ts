import axios from "axios";

const API_SignUp = (data: { email: string; password: string; confirmPassword: string }) => {
  return axios.post("/api/login", data);
};

export default API_SignUp;
