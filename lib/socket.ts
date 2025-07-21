import { io } from 'socket.io-client'
//link be socket
const socket = io('https://your-backend-url', {
    autoConnect: false,
    transports: ['websocket'],
})

export default socket
