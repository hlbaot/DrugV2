import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import { API } from '@/src/api/api';

// Socket.IO cho comment real-time - namespace '/comments'
const socketComment = io(`${API}/comments`, {
  path: '/socket.io',
  transports: ['websocket'],
  auth: { token: Cookies.get('token') },
  autoConnect: true,
});

export default socketComment;
