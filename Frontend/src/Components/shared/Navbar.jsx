import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { LogOut, LogOutIcon, User2 } from 'lucide-react';
import { USER_API_ENDPOINT } from '@/utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';

const Navbar = () => {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async (e) => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setUser(null));
                navigate("/")
            }
        } catch (error) {
            console.log(error)
            console.log(error?.response?.data?.message)
        }
    }
    return (
        <div className='flex items-center justify-between p-2 m-2 max-w-full border shadow-lg border-gray-200 rounded-md'>
            <div className="flex items-center gap-2">
                <img src="https://i.scdn.co/image/ab6761610000e5ebcaa3bc230d90d20eaa11a22a" alt="logo" className='rounded-full w-10 md:w-15' />

                <h1 className='text-base md:text-lg text-gray-700 font-semibold'>Chat Bindas</h1>
            </div>

            <div className="flex items-center gap-2">
               

                <div className="flex gap-1 md:gap-2">
                    <div className="bg-gray-100 p-2 hover:bg-gray-200 w-fit rounded-full">
                        <IoMdNotificationsOutline size={"24px"} />
                    </div>


                    <Popover>
                        <PopoverTrigger asChild>
                            {
                                user?.profilePhoto ? (
                                    <img
                                        src={user.profilePhoto}
                                        alt="profilePhoto"
                                        className="w-10 h-10 rounded-full object-cover cursor-pointer"
                                    />
                                ) : (
                                    <div className="w-10 h-10 text-lg rounded-full bg-green-500 text-white flex items-center justify-center font-semibold cursor-pointer">
                                        {user?.fullName?.charAt(0).toUpperCase()}
                                    </div>
                                )
                            }
                        </PopoverTrigger>
                        <PopoverContent className='w-40 mr-5 border-none focus:outline-none rounded-2xl border-gray-200 p-4 shadow-2xl bg-gray-200'>
                            <div className="flex gap-4 space-y-2 items-center">
                                {
                                    user?.profilePhoto ? (
                                        <img
                                            src={user.profilePhoto}
                                            alt="profilePhoto"
                                            className="w-9 h-9 rounded-full object-cover cursor-pointer"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 text-lg rounded-full bg-green-500 text-white flex items-center justify-center font-semibold cursor-pointer">
                                            {user?.fullName?.charAt(0).toUpperCase()}
                                        </div>
                                    )
                                }
                                <div className=''>
                                    <h4 className='font-medium text-lg text-gray-800'>{user?.fullName}</h4>
                                </div>
                            </div>

                            <div className="cursor-pointer" onClick={()=>navigate("/profile")}>
                                <div className="flex items-center gap-4">
                                    <User2 className='text-gray-700'/>
                                    <Link to="/profile"><a className='text-md hover:underline hover:text-blue-800'>Profile</a></Link>
                                </div>
                            </div>

                            <div className="cursor-pointer" onClick={logoutHandler}>
                                <div className="flex items-center gap-4">
                                    <LogOutIcon className='text-gray-700'/>
                                    <p className='text-md hover:underline hover:text-blue-800'>Logout</p>
                                </div>
                            </div>


                        </PopoverContent>
                    </Popover>
                </div>
            </div>

        </div>
    )
}

export default Navbar