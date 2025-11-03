import { io } from 'socket.io-client'
import Cookies from 'js-cookie'

const socket = io('ws://10.243.200.17:5050/comments', {
  transports: ['websocket'],
  withCredentials: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  auth: {
    token: Cookies.get('token'),
  },
})

export default socket
