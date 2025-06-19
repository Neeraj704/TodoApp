import axios from 'axios';
import icon from '../assets/logo.png';
import React from 'react';
import { useState } from 'react';
import loginMan from '../assets/loginMan.svg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function addUserInMongo () {
    await axios.post('http://localhost:3000/signup', {
      username : username,
      password : password,
      email: email
    })
    .then ((res) => {
      const token = res.data.token;
      sessionStorage.setItem('jwtToken', token);
      navigate('/home');
    });
  };

  function goToSignIn () {
    navigate('/signin');
  }

  return (
    <div className='flex h-screen'>
      <div className='flex-1 relative justify-center align-middle'>
        <div className='bottom-[350px] left-[110px] absolute '>
          <img src={loginMan}></img>
          <div className='absolute left-[130px]'>  
            <div className='font-bold text-4xl mb-7'>Keep life simple</div>
            <div className='font-normal text-slate-500 max-w-[440px] text-2xl'>Store all your Todo'S in a simple and intutive app that helps you understand what is most important in life.</div>
          </div>  
        </div>
      </div>
      <div className='flex-1 bg-[#FFFDFA] shadow-xl flex flex-col '>
        <div className='flex flex-col justify-center mx-auto my-auto p-10 gap-7'>
          <div className='flex align-middle justify-center relative mb-8 '>
            <img src={icon} className='w-20 mb-8 absolute left-0 top-[-10px]'></img>
            <div className='font-bold text-6xl left-[104px]  absolute'>Todo.</div>
            <div className='font-normal text-3xl absolute top-[26px] right-[15px]'><i>me</i></div>
          </div>
          <div className='flex flex-col gap-7 mt-16'>
            <input placeholder='Enter username' onChange={(e) => {setUsername(e.target.value)}} className='min-w-80 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            <input placeholder='Enter email' onChange={(e) => {setEmail(e.target.value)}} className='min-w-72 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            <input placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}} className='min-w-72 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            <button onClick={addUserInMongo} className='bg-[#30C58D] p-2 py-3 rounded-xl'>SIGN UP</button>
            <div className='text-[#4C9FFD] cursor-pointer' onClick={goToSignIn}>Already have an account? Sign In</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;