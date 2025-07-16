import {io} from 'socket.io-client'
const socket = io("https://foodopia-server.onrender.com",{
    auth:{
        token:localStorage.getItem('accessToken')|| ''
    },
    withCredentials:true,
    autoConnect:false,
    transports: ['websocket','polling'],
})

export default socket