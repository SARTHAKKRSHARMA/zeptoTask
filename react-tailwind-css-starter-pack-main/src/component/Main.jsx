import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeUser, setHighlightLastOne, setMatchedUser } from '../slices/mailSlice';
import MatchedUserList from './MatchedUserList';
import { MdOutlineCancel } from "react-icons/md";


const Main = () => {
    const {addedUser, highlightLastOne} = useSelector(state => state.mailList);
    const [userInput, setUserInput] = useState("");
    const inputTagRef = useRef(null);
    const absoluteDivRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch();


    // Use useRef for the timeout variable
    const timeoutRef = useRef(null);

    // Handle input changes
    const inputHandler = function () {
        const inputElement = inputTagRef.current;
        inputElement.style.width = (inputElement.value.length + 1) + 'ch';
    }

    // Handle click on the container
    const clickHandler = function () {
        inputTagRef.current.focus();
        setTimeout(() => {
            setIsVisible(true)
        }, 200);
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

    // Handle input focus
    const handleFocus = () => {
        setIsVisible(true);
    }

    // Handle input blur
    const handleBlur = () => {
        setTimeout(() => {
            setIsVisible(false);
        }, 200);
    }

    // Remove user from the list
    const removeUserFromList = (e, id) => {
        e.stopPropagation();
        dispatch(removeUser(id));
        inputTagRef.current.value = '';
        setUserInput('');
        inputTagRef.current.blur();
    }

    useEffect(() => {
        // Handle key events
        const handleKeyDown = (e) => {
            if(addedUser.length === 0) return;
          if (e.key === 'Backspace' && userInput.length === 0 && !highlightLastOne) {
            // Set highlightLastOne to true when Backspace is pressed and userInput is empty
            dispatch(setHighlightLastOne(true));
          } else if (highlightLastOne && e.key === 'Backspace') {
            // Remove the last added user when Backspace is pressed again
            dispatch(removeUser(-1));
          } else {
            // Reset highlightLastOne to false when any other key is pressed
            dispatch(setHighlightLastOne(false));
          }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, [dispatch, userInput, highlightLastOne, addedUser]);

  return (
    <div className='w-[60%] min-h-[500px] h-auto bg-[#DADADA] shadow-md rounded-md py-5 px-3'>
        <div onClick={clickHandler} className=' w-[100%] h-auto bg-[#EFEFEF]  flex flex-row gap-3 flex-wrap py-5 px-3 border-[#900C3F] border-b-4 rounded-md relative'>
            <>
                {
                    addedUser.map((user, index) => (
                        <div key={user.id} className={` rounded-full min-w-[150px] w-auto flex flex-row gap-3 justify-between items-center bg-[#DADADA] pr-2 ${highlightLastOne && index === addedUser.length - 1 ? "border-blue-500 border-2" : ""}`}>
                            <div className=' w-[30px] aspect-square rounded-full flex flex-row items-center justify-center overflow-hidden'>
                                <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt='User Thumbnail' />
                            </div>
                            <p className=' text-[12px] font-bold'>{user.name}</p>
                            <button onClick={(e) => removeUserFromList(e, user.id)}><MdOutlineCancel /></button>
                        </div>
                    ))
                }
            </>

            <div className=' w-auto max-w-[100%] min-w-[100%] h-auto bg-[#EFEFEF]  flex flex-row gap-3 flex-wrap rounded-md relative'>
                <input
                    placeholder='Add User' 
                    onInput={inputHandler} 
                    onChange={changeHandler} 
                    ref={inputTagRef}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    type='text' 
                    value={userInput} 
                    className=' outline-none bg-[#EFEFEF] w-auto  max-w-[100%] transition-all duration-[200]' />
                
                {
                    isVisible && <div ref={absoluteDivRef}  className='absolute w-[400px] max-w-[100%] h-auto bg-[#EFEFEF] left-0 top-[200%] py-1 overflow-x-auto'>
                        <MatchedUserList inputTagRef={inputTagRef} userInput={userInput} setUserInput={setUserInput} isVisible={isVisible}/>
                    </div>
                }
            </div>

        </div>
    </div>
  )
}

export default Main