import { Pen } from 'lucide-react';
import React from 'react'
import { useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const user = useSelector(store => store.auth.user);
    const navigate = useNavigate();

    return (
        <div>
            <h1 className='text-2xl md:text-3xl font-bold text-blue-600 text-center text-shadow-lg mt-3'>Profile Page</h1>
            <div className='mt-6 w-full max-w-sm mx-auto border border-gray-300 shadow-2xl rounded-2xl overflow-hidden'>
                <div className="flex items-center justify-center relative">

                    <div className='bg-blue-100 p-3 hover:bg-blue-200 w-fit rounded-full absolute top-2 right-2 z-10' onClick={()=>navigate("/profile/update")}>
                        <Pen className=' text-blue-500' />
                    </div>
                    {
                        user?.profilePhoto ? (
                            <img
                                src={user?.profilePhoto}
                                alt="profilePhoto"
                                className="w-full h-60 md:h-70 object-cover cursor-pointer"
                            />
                        ) : (
                            <div className="w-10 h-10 text-lg rounded-full bg-green-500 text-white flex items-center justify-center font-semibold cursor-pointer">
                                {user?.fullName?.charAt(0).toUpperCase()}
                            </div>
                        )
                    }
                </div>

                <div className='mt-10 p-2'>
                    <h3 className='text-blue-600 font-bold text-sm'>full name</h3>
                    <h1 className='text-2xl border-b border-b-gray-200  font-semibold text-blue-900'>{user?.fullName}</h1>
                </div>


                <div className='mt-4 p-2'>
                    <h3 className='text-blue-600 font-bold text-sm'>user name</h3>
                    <h1 className='text-2xl border-b border-b-gray-200  font-semibold text-blue-900'>{user?.userName}</h1>
                </div>

                <div className='mt-4 p-2'>
                    <h3 className='text-blue-600 font-bold text-sm'>gender</h3>
                    <h1 className='text-2xl border-b border-b-gray-200  font-semibold text-blue-900'>{user?.gender}</h1>
                </div>





            </div>
        </div>

    )
}

export default Profile