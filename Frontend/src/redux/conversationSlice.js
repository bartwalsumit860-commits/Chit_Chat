import { createSlice } from "@reduxjs/toolkit";

export const conversationSlice = createSlice({
    name: "conversationSlice",
    initialState:{
        convo:null,
        convo_users:[]
    },

    reducers:{
        //actions
        setConvo:(state,action)=>{
            state.convo = action.payload
        },

        setConvoUsers:(state,action)=>{
            state.convo_users = action.payload;
        }
    }
});

export const {setConvo,setConvoUsers} = conversationSlice.actions;
export default conversationSlice.reducer;