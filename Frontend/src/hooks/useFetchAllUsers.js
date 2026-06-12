import { setAllUsers } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/api";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(
          `${USER_API_ENDPOINT}/getOtherUsers`,
          { withCredentials: true }
        );

        if (res?.data?.success && res?.data?.OtherUsers) {
          dispatch(setAllUsers(res?.data?.OtherUsers));
          
        }
      } catch (error) {
        console.log(error?.responnse?.data?.message)
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [dispatch]);
};

export default useFetchAllUsers;