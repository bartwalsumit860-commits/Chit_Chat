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
  const convo = useSelector(store => store.conversation.convo);

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
              <div className={`${convo ? 'hidden md:block' : 'block'} w-full md:w-[40%] lg:w-[30%]`}>
                <MessageSidebar />
              </div>
              <div className={`${convo ? 'block' : 'hidden md:block'} flex-1`}>
                <MessageBox />
              </div>
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