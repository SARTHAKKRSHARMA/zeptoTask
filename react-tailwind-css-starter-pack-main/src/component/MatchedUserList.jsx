import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../slices/mailSlice';

const MatchedUserList = ({inputTagRef, setUserInput}) => {
    const {matchedUser} = useSelector(state => state.mailList);
    const dispatch = useDispatch();

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
            matchedUser.map((user) => 
                <div key={user.id} onClick={(e) => clickHandler(e, user.id)} className=' w-[100%] flex flex-row justify-around items-center py-2 hover:bg-[#DADADA] transition-all duration-200'>
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