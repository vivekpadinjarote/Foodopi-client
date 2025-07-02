import axios from 'axios'
import {store} from '../store/store'
import { logout, setCredentials } from '../store/auth';

const api = axios.create({
    baseURL:"http://localhost:4000",
    withCredentials:true,
})

api.interceptors.request.use((config)=>{
    const state = store.getState();
    const token = state.auth.accessToken
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
    }

    return config;
})

api.interceptors.response.use(
    res=> res,
    async (err)=>{
        const originalRequest = err.config;
        if(err.response?.status === 401 && !originalRequest._retry && originalRequest.url !== '/api/user/refresh'){
            originalRequest._retry = true;
            try{
                const res = await api.post('/api/user/refresh');
                const {accessToken} = res.data;
                const user = store.getState().auth.user;
                store.dispatch(setCredentials({accessToken,user}));
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`
                return api(originalRequest)   
            }catch(refreshError){
                try{
                    await api.post('/api/user/logout')
                }catch(err){
                    console.log("logout failed: ",err.message);
                }
                store.dispatch(logout())
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(err)
    }
)



export default api;