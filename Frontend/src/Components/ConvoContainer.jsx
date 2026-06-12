  import React, { useEffect, useState } from 'react'
  import PersonRows from './PersonRows'
  import useFetchAllUsers from "@/hooks/useFetchAllUsers";
  import { useSelector } from 'react-redux';
  import useFetchAllConvoUsers from '@/hooks/useFetchAllCovo_users';

  const ConvoContainer = ({category, search }) => {
    useFetchAllUsers();
    useFetchAllConvoUsers();
  
    const convo_users = useSelector(store=>store.conversation.convo_users);


    const users = useSelector(store => store.auth.users);
    const [filteredUser, setFilteredUser] = useState(users);
    
    
    useEffect(() => {
      const filter = users.filter((user, index) => user?.fullName?.toLowerCase().includes(search?.toLowerCase()));
      setFilteredUser(filter)
    }, [search,users])

    useEffect(() => {
    if (category === 0) {
        setFilteredUser(convo_users);
    } else {
        setFilteredUser(users);
    }
}, [category, convo_users, users]);

    return (
      <div className='mt-2 grid grid-cols-1'>
        {
          filteredUser?.map((user, index) => {
            return (
              <PersonRows key={index} user={user} />
            )
          })
        }
      </div>
    )
  }

  export default ConvoContainer