import axios from "axios";

const API_SignUp = (data: { email: string; password: string; confirmPassword: string }) => {
  return axios.post("http://10.243.252.64:5050/api/users/register", data);
};

export default API_SignUp;
