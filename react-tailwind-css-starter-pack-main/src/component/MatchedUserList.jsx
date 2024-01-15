import React from 'react'
import { useSelector } from 'react-redux'

const MatchedUserList = () => {
    const {matchedUser} = useSelector(state => state.mailList);

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
                <div className=' w-[100%] flex flex-row justify-around items-center py-2 hover:bg-[#DADADA] transition-all duration-200'>
                    <div className=' w-[10%] aspect-square rounded-full flex flex-row items-center justify-center overflow-hidden'>
                        <img src={`https://ui-avatars.com/api/?name=${user.name}`} />
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