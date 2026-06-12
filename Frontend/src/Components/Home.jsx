import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import MessageSidebar from './MessageSidebar';
import MessageBox from './MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './auth/Signup';
import socket from "../utils/socket";
import { setOnlineUsers } from '@/redux/authSlice';


const Home = () => {
  const dispatch = useDispatch();
  let user = useSelector(store => store.auth.user);

  //connection
  useEffect(() => {

    if (user?._id) {

      socket.emit(
        "join",
        user._id
      );
    }

  }, [user]);

  //get online users
  useEffect(() => {
    socket.on("getOnlineUsers", (users) => {
     dispatch(setOnlineUsers(users))
    });

    return () => {
      socket.off("getOnlineUsers");
    }
  }, []);

  return (
    <div>
      {
        user && (
          <>
            <Navbar />
            <div className="max-w-full flex mt-4">
              <MessageSidebar className='w-[30%]' />
              <MessageBox />
            </div>
          </>
        )
      }
      {
        !user && (
          <>
            <Signup />
          </>
        )
      }
    </div>
  )
}

export default Home;