import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../slices/mailSlice';

const MatchedUserList = ({inputTagRef, setUserInput, isVisible}) => {
    const {matchedUser} = useSelector(state => state.mailList);
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    
    useEffect(() => {
        const handleKeyDown = (e) => {
          if (!isVisible) return; 
          if (e.key === 'ArrowUp') {
            e.stopPropagation()
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex - 1 + matchedUser.length) % matchedUser.length);
          } else if (e.key === 'ArrowDown') {
            e.stopPropagation()
            e.preventDefault();
            setSelectedIndex((prevIndex) => (prevIndex + 1) % matchedUser.length);
          } else if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            const selectedUser = matchedUser[selectedIndex];
            if (selectedUser) {
              dispatch(addUser(selectedUser.id));
              setSelectedIndex(0);
              inputTagRef.current.value = '';
              setUserInput('');
              inputTagRef.current.blur();
            }
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, [dispatch, inputTagRef, setUserInput, matchedUser, selectedIndex, isVisible]);
    

    const clickHandler = function (e, id) {
        e.stopPropagation();
        dispatch(addUser(id));
        inputTagRef.current.value = '';
        setUserInput("");
        inputTagRef.current.blur();
    }

    if(matchedUser.length === 0)
    {
        return <div className=' w-[100%] py-2 px-3'>
            No matched user found!
        </div>
    }


    return (
    <div className=' w-[100%] flex flex-col gap-3'>
        {
            matchedUser.map((user, index) => 
                <div key={user.id} onClick={(e) => clickHandler(e, user.id)} className={` w-[100%] flex flex-row justify-around items-center py-2 hover:bg-[#DADADA] transition-all duration-200 ${index === selectedIndex ? 'bg-[#DADADA]' : ''}`}>
                    <div className=' w-[10%] aspect-square rounded-full flex flex-row items-center justify-center overflow-hidden'>
                        <img src={`https://ui-avatars.com/api/?name=${user.name}`} alt='User Thumbnail' />
                    </div>
                    <div className=' w-[33%]'>
                        <p className=' text-[14px] font-bold'>{user.name}</p>
                    </div>

                    <div className='w-[33%]'>
                        <p className=' text-[10px] text-opacity-40'>{user.email}</p>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default MatchedUserList