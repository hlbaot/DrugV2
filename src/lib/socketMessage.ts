import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { API } from '@/src/api/api';

// Socket.IO cho chat - namespace '/chats'
const socketMessage = io(`${API}/chats`, {
  path: '/socket.io',
  transports: ['websocket'],
  auth: { token: Cookies.get('token') },
  autoConnect: true,
});

export default socketMessage;
