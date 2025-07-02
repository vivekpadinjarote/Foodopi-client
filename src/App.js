import { useEffect, useState } from 'react';
import Login from './components/Login-popup/login';
import Navbar from './components/navbar/navbar';
import socket from './utils/socket';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from './utils/axios';
import { logout, setCredentials } from './store/auth';


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [status, setStatus] = useState("disconnected");
  const { accessToken, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    if(accessToken){
      socket.auth.token = accessToken
      socket.connect()
      setStatus("connecting")

      socket.on("connect", () => {
        setStatus("connected");
        console.log("Socket connected");
      });
      socket.on("connect_error", async (err) => {

        setStatus("error");
        console.error("Socket connection error:", err.message);

        if(err.message ==="Authorization Error"){
          const refreshToken = await api.get('/api/user/refresh');
          if(refreshToken.data.success){
            console.log("Access token refreshed");
            dispatch(setCredentials({accessToken:refreshToken.data.accessToken}));
            socket.auth.token = refreshToken.data.accessToken;
            socket.connect();
          } else {
            console.log("Failed to refresh access token, logging out");
          }
          console.log("Access token expired, logging out");
          dispatch(logout());
          socket.disconnect();
          setShowLogin(true);
        }
      });

      socket.on("disconnect", () => {
        setStatus("disconnected");
        console.log("Socket disconnected");
      });

      socket.on("profile:update", (data) => {
        console.log("Profile updated:", data);
        dispatch(setCredentials({user:data}));
      });

      socket.on("profile-img:update", (data) => {
        console.log("Profile image updated:", data);
        dispatch(setCredentials({user:{...user,userProfilePic:data.profilePic}}));
      });

      socket.on("forceLogout", () => {
        console.log("Force logout triggered");
        dispatch(logout());
        socket.disconnect();
      });
    }
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("profileUpdated");
      socket.off("forceLogout");
    };
  }, [accessToken,dispatch]);

  return (
    <>
    {showLogin? <Login setShowLogin={setShowLogin} />:<></>}
    <div>
      <Navbar setShowLogin={setShowLogin} />
    </div>
    <Outlet />
    </>
  );
}

export default App;
