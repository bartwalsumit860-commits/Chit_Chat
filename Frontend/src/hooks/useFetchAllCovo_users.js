import { setConvoUsers } from "@/redux/conversationSlice";
import { MESSAGE_API_ENDPOINT } from "@/utils/api";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"


const useFetchAllConvoUsers = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllConvoUsers = async ()=>{

            try {
                const res = await axios.get(`${MESSAGE_API_ENDPOINT}/getConversations`,{
                withCredentials:true
              });

             if(res?.data?.success){
                dispatch(setConvoUsers(res.data.convo_users));
             }
            } catch (error) {
                console.log(error);
                console.log(error?.response?.data?.message)
            }
         
        }

         fetchAllConvoUsers();
    },[dispatch])
}

export default useFetchAllConvoUsers