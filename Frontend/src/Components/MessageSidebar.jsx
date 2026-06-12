import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import ConvoContainer from './ConvoContainer';
import { useSelector } from 'react-redux';
import useFetchAllConvoUsers from '@/hooks/useFetchAllCovo_users';


const messageCategory = [
    {
        text: "Your Conversations"
    },

    {
        text: "All Users"
    },
]

const MessageSidebar = () => {

    const users = useSelector(store => store.auth.users);
    const [searchText, setSearchText] = useState("");


    const changeEventHandler = (e) => {
        setSearchText(e.target.value);
    }
    const [category, setCategory] = useState(0);
    return (
        <div className='m-2 rounded-t-xl border border-gray-200 shadow-lg w-[30%] p-2 h-[90vh] rounded-b-2xl'>
            <div className="flex items-center gap-4 p-2 max-w-full">
                <h1 className='text-2xl text-gray-900 font-semibold'>Messages</h1>

                <div className="flex items-center gap-2">
                    <div className="bg-gray-100 p-2 hover:bg-gray-200  rounded-full">
                        <IoIosSearch size={"24px"} />
                    </div>
                    <input type="text"
                        className='bg-gray-100 rounded-2xl p-2 focus:outline-none'
                        placeholder='Search Users...'
                        onChange={changeEventHandler} />

                </div>
            </div>

            <div className="mt-2 flex justify-around items-center max-w-full border-b-2 border-b-gray-200">
                {
                    messageCategory.map((item, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => setCategory(index)}
                                className={`px-4 py-2  transition text-center w-full ${category === index ? 'border-b-4 border-b-orange-400' : 'border-b-0 border-b-transparent'} hover:bg-gray-100 flex itmes-center gap-5 p-4 ' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                {item.text}
                            </button>
                        )
                    })
                }
            </div>

            <ConvoContainer category={category} search={searchText} />
        </div>
    )
}

export default MessageSidebar