import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const socket = io('http://10.36.120.153:5050/comments', {
  path: '/socket.io',
  transports: ['websocket'],
  auth: { token: Cookies.get('token') },
  autoConnect: true,
});


export default socket;
