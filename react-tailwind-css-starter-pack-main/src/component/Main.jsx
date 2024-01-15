import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMatchedUser } from '../slices/mailSlice';

const Main = () => {
    const [userInput, setUserInput] = useState("");
    const inputTagRef = useRef(null);
    const dispatch = useDispatch();

    // Use useRef for the timeout variable
    const timeoutRef = useRef(null);

    // Focus on input element when component mounts
    useEffect(() => {
        inputTagRef.current.focus();
    }, [])

    // Handle input changes
    const inputHandler = function () {
        const inputElement = inputTagRef.current;
        inputElement.style.width = (inputElement.value.length + 1) + 'ch';
    }

    // Handle click on the container
    const clickHandler = function () {
        inputTagRef.current.focus();
    }

    // Handle text input changes
    const changeHandler = function () {
        const userValue = inputTagRef.current.value;
        setUserInput(userValue);
        clearTimeout(timeoutRef.current);
        // Set a timeout to update the state after a certain delay (e.g., 500 milliseconds)
        timeoutRef.current = setTimeout(() => {
            dispatch(setMatchedUser(inputTagRef.current.value));
        }, 500);
    }

  return (
    <div className='w-[60%] min-h-[500px] h-auto bg-[#DADADA] shadow-md rounded-md py-5 px-3'>
        <div onClick={clickHandler} className=' w-[100%] h-auto bg-[#EFEFEF]  flex flex-row gap-3 flex-wrap py-5 px-3 border-[#900C3F] border-b-4 rounded-md'>
            <input 
                onInput={inputHandler} 
                onChange={changeHandler} 
                ref={inputTagRef} 
                type='text' 
                value={userInput} 
                className=' outline-none bg-[#EFEFEF] w-auto min-w-[22ch] transition-all duration-[10]' />
        </div>
    </div>
  )
}

export default Main