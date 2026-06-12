import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        user:null,
        users:[],
        onlineUsers:[]
    },

    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload;
        },
        setAllUsers:(state,action)=>{
            state.users = action.payload;
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        }
    }
});

export const {setUser,setAllUsers,setOnlineUsers} = authSlice.actions;
export default authSlice.reducer;