import axios from "axios";
// Sign in
const API_SignIn = (data: { email: string; password: string }) => {
  return axios.post("http://10.243.200.17:5050/api/users/login", data);
};

export default API_SignIn;
