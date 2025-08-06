import axios from "axios";
// Sign up
const API_SignUp = (data: { email: string; password: string }) => {
  return axios.post("http://10.243.200.17:5050/api/users/register", data);
};

export default API_SignUp;
