import axios from "axios";

const API_SignUp = (data: { email: string; password: string; confirmPassword: string }) => {
  return axios.post("http://192.168.1.48:5050/api/users/register", data);
};

export default API_SignUp;
