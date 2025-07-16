import { useEffect, useState } from 'react';
import socket from './utils/socket';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import api from './utils/axios';
import { logout, setCredentials } from './store/auth';
import { setCart } from './store/cartSlice';
import Login from './components/Login-popup/login';


function Root() {
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

        if(err.message === "TokenExpired"){
          try {

          const refreshToken = await api.post('/api/user/refresh');
          if(refreshToken.data.success){
            console.log("Access token refreshed");
            dispatch(setCredentials({accessToken:refreshToken.data.accessToken, user}));
            socket.auth.token = refreshToken.data.accessToken;
            socket.connect();
          } else {
            console.log("Failed to refresh access token, logging out");
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
          console.log("Access token expired, logging out");
          dispatch(logout());
          socket.disconnect();
          setShowLogin(true);
        }
      }});

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

      socket.on("cart:update",(data)=>{
        console.log("cart updated",data)
        
        const items = data.items.map((item) => ({
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
        }));

        const totalPrice = data.totalPrice;
        const totalItems = items.length;
        dispatch(setCart({items, totalPrice, totalItems}))
      })

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
      socket.off("profile:update");
      socket.off("profile-img:update");
      socket.off("cart:update");
      socket.off("forceLogout");
    };
  }, [accessToken,dispatch]);

  // useEffect(() => {
  //   dispatch(clearCart());
  // }, []);

  return (
    <>
    
        {showLogin? <Login setShowLogin={setShowLogin} />:<></>}
    <Outlet context={{setShowLogin, showLogin}}/>
    </>
  );
}

export default Root;
