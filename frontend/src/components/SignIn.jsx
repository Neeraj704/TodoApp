import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icon from '../assets/logo.png';
import loginMan from '../assets/loginMan.svg';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  async function checkUserFromMongo () {
    await axios.post('https://todoapp-vlmg.onrender.com/signin', {
      email : email,
      password : password
    })
    .then ((res) => {
      const token = res.data.token;
      sessionStorage.setItem('jwtToken', token);
      navigate('/home');
    });
  };

  function goToSignUp () {
    navigate('/signup');
  }

  return (
    <div className='flex h-screen'>
      <div className='flex-1 relative justify-center align-middle'>
        <div className='bottom-[350px] left-[110px] absolute '>
          <img src={loginMan} class></img>
          <div className='absolute left-[130px]'>  
            <div className='font-bold text-4xl mb-7'>Keep life simple</div>
            <div className='font-normal text-slate-500 max-w-[440px] text-2xl'>Store all your Todo'S in a simple and intutive app that helps you understand what is most important in life for you.</div>
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
            <input placeholder='Enter email' onChange={(e) => {setEmail(e.target.value)}} className='min-w-80 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3  inset-ring'></input>
            <input type='password' placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}} className='min-w-72 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            <button onClick={checkUserFromMongo} className='bg-[#30C58D] p-2 py-3 rounded-xl'>SIGN IN</button>
            <div className='text-[#4C9FFD] cursor-pointer' onClick={goToSignUp}>Dont have an account yet? Sign Up</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;