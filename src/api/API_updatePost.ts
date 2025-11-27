import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";
import { UpdateProfileRequest } from "../interfaces/post";

export const UpdateProfile = async (data: UpdateProfileRequest): Promise<void> => {
  const token = Cookies.get('token');

  const formData = new FormData();

  if (data.avatar) formData.append("avatar", data.avatar);
  if (data.username) formData.append("username", data.username);
  if (data.bio) formData.append("bio", data.bio);

  await axios.put(`${API}/users/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    },
  });
};
