import {io} from 'socket.io-client'
const socket = io("http://localhost:4000",{
    auth:{
        token:localStorage.getItem('accessToken')|| ''
    },
    withCredentials:true,
    autoConnect:false
})

export default socket