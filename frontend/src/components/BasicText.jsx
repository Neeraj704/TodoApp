import React, { useState , useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import lightMode from '../assets/lightMode.png';
import lightModeD from '../assets/lightModed.png';
import search from '../assets/search.svg';
import refreshSvg from '../assets/refresh.svg';
import refreshSvgd from '../assets/refreshd.svg';
import axios from 'axios';


const BasicText = ({getTodos, darkMode, setDarkMode}) => {
  const toggleDark = () => 
    setDarkMode(prev => !prev);
  const [username, setUsername] = useState();
  const gotTodos = getTodos;


  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  async function refreshTodos () {
    await axios.get('https://todoapp-vlmg.onrender.com/read')
    await getTodos();
  }

  return (
    <div className='flex flex-col mt-16 w-full'>
      <div className='flex justify-between items-center pr-32'>
        <div className='flex align-top relative'>
          <div>
            <img src={search} className='hover:scale-90 active:scale-75 cursor-pointer absolute bottom-[5px] left-[4px]'></img>
          </div>
          <input placeholder="Search Todo" className='bg-transparent w-[420px] font-normal ml-10 text-xl text-gray-400 border-0 border-b-2 active:border-none active:outline-hidden outline-none'></input>
        </div>
        <div className='flex '>
          <img src={darkMode ? lightModeD : lightMode} onClick={toggleDark} className='dark:w-6 cursor-pointer hover:scale-90 active:scale-75'></img> 
          <img src={darkMode ? refreshSvgd : refreshSvg} onClick={refreshTodos} className='hover:scale-90 active:scale-75 ml-8 max-w-6 cursor-pointer'></img>
        </div> 
      </div>
      <div className='mb-[80px]'>
        <div className='block mt-20 text-4xl dark:text-[#FFFFFF]'>Hello, <b>{username}</b>! 👋🏻</div>
        <div className='block text-xl mt-5 dark:text-[#A8A8B3]'>All your todos are here, in one place!</div>
      </div>
    </div>
  )
}

export default BasicText