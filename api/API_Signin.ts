import axios from "axios";

const API_SignIn = (data: { email: string; password: string }) => {
  return axios.post("http://192.168.1.48:5050/api/users/login", data);
};

export default API_SignIn;
