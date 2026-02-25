import axios from "axios";
import Cookies from "js-cookie";
import { API } from "./api";

export const getListMessage = async () => {
    const token = Cookies.get('token');
    const res = await axios.get(`${API}/chats/list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const result = Array.isArray(res.data) ? res.data : (res.data.chats || res.data.data || res.data);
    // Backend wraps response — extract the array from the correct field
    if (Array.isArray(res.data)) return res.data;
    if (res.data.chats) return res.data.chats;
    if (res.data.data) return res.data.data;
    return res.data;
}

export const getMessageById = async (roomId: string) => {
    const token = Cookies.get('token');
    const res = await axios.get(`${API}/rooms/${roomId}/chats`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            limit: 100,  // Lấy nhiều tin nhắn hơn
        }
    });
    return res.data;
}

export const createRoom = async (partnerId: number) => {
    const token = Cookies.get('token');
    const res = await axios.post(`${API}/rooms`,
        { members: [partnerId], type: 'PERSONAL' },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return res.data;
}
