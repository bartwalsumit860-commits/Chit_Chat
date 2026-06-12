import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setConvo } from '../redux/conversationSlice';
import { useNavigate } from 'react-router-dom';

const PersonRows = ({ user }) => {
    const selector = store => store.conversation.convo; //need real convo here
    const convo = useSelector(selector)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <div onClick={() => {
            navigate(`/message/${user._id}`)
            dispatch(setConvo(user))
        }} className='p-2 border-b border-b-gray-300 flex items-center gap-3  hover:bg-gray-100'>
            <div className="">
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
            </div>

            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                    <h3 className='text-lg font-semibold'>{user?.fullName}</h3>
                    <p className='text-sm text-gray-500'>10:01 AM</p>
                </div>

                <div className="overflow-hidden">
                    <p className='text-sm text-gray-600'></p>
                </div>
            </div>

        </div>
    )
}

export default PersonRows