import React, { useState , useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import lightMode from '../assets/lightMode.svg';
import search from '../assets/search.svg';


const BasicText = () => {
  const [username, setUsername] = useState();
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  return (
    <div className='flex flex-col mt-16 w-full'>
      <div className='flex justify-between items-center pr-32'>
        <div className='flex align-top relative'>
          <div>
            <img src={search} className='absolute bottom-[5px] left-[4px]'></img>
          </div>
          <input placeholder="Search Todo" className='w-[420px] font-normal ml-10 text-xl text-gray-400 border-0 border-b-2 active:border-none active:outline-hidden outline-none'></input>
        </div>
        <img src={lightMode}></img> 
      </div>
      <div className='mb-[80px]'>
        <div className='block mt-20 text-4xl'>Hello, <b>{username}</b>! 👋🏻</div>
        <div className='block text-xl mt-5'>All your todos are here, in one place!</div>
      </div>
    </div>
  )
}

export default BasicText