import {io} from 'socket.io-client'
const socket = io("https://your-backend.onrender.com",{
    auth:{
        token:localStorage.getItem('accessToken')|| ''
    },
    withCredentials:true,
    autoConnect:false,
    transports: ['websocket'],
})

export default socket