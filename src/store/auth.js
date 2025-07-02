import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        accessToken: localStorage.getItem("accessToken") || null
    },
    reducers: {
        setCredentials:(state,action)=>{
            state.user = action.payload.user;

            if(action.payload.accessToken){
            state.accessToken = action.payload.accessToken
            localStorage.setItem("accessToken", action.payload.accessToken)
            }

            localStorage.setItem("user",JSON.stringify(action.payload.user))
        },
        logout: (state) => {
            state.user = null;
            state.accessToken = null

            localStorage.removeItem("user")
            localStorage.removeItem("accessToken")
        },
    }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;