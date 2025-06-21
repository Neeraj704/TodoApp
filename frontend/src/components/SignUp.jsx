import axios from 'axios';
import icon from '../assets/logo.png';
import React from 'react';
import { useState } from 'react';
import loginMan from '../assets/loginMan.svg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //haa ofc google se uthaya hai :D
    return emailRegex.test(email);
  };
  const isStrongPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;  //haa ofc google se uthaya hai :D
    return passwordRegex.test(password);
  };

  function emailTyping (e) {
    setEmail(e.target.value);
    setEmailError('');
    setSignupError('');
  }

  function passwordTyping (e) {
    setPassword(e.target.value);
    setPasswordError('');
    setSignupError('');
  }

  async function addUserInMongo (e) {
    e.preventDefault();
    let isValid = true;

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!isStrongPassword(password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      try {
        setSignupError('');
        const res = await axios.post('https://todoapp-vlmg.onrender.com/signup', {
          username,
          password,
          email
        });
        const token = res.data.token;
        sessionStorage.setItem('jwtToken', token);
        navigate('/home');
      } catch (err) {
          if (err.response && err.response.data && err.response.data.error) {
            setSignupError(err.response.data.error);
          } else {
            setSignupError('An unexpected error occurred. Please try again.');
          }
        } 
    } 
  };

  function goToSignIn () {
    navigate('/signin');
  }

  return (
    <div className='flex h-screen'>
      <div className='flex flex-1 flex-col justify-center mx-auto'>
        <img src={loginMan} className='w-96 mx-auto scale-x-[-1]'></img>
        <div className='flex flex-col mx-auto'>  
          <div className='font-bold text-4xl mb-7 inline-block'>Keep life simple</div>
          <div className='font-normal text-slate-500 max-w-[440px] text-2xl'>Store all your Todo'S in a simple and intutive app that helps you understand what is most important in life for you.</div>
        </div>  
      </div>
      <div className='flex-1 bg-[#FFFDFA] shadow-xl flex flex-col '>
        <div className='flex flex-col justify-center mx-auto my-auto gap-7 max-w-80'>
          <div className='flex align-middle justify-center relative mb-8 '>
            <img src={icon} className='w-20 mb-8 absolute left-0 top-[-10px]'></img>
            <div className='font-bold text-6xl left-[104px]  absolute'>Todo.</div>
            <div className='font-normal text-3xl absolute top-[26px] right-[15px]'><i>me</i></div>
          </div>
          <div className='flex flex-col gap-7 mt-16'>
            <input placeholder='Enter username' onChange={(e) => {setUsername(e.target.value)}} className='min-w-80 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            <input placeholder='Enter email' onChange={(e) => {emailTyping(e)}} className='min-w-72 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            {emailError && (<div className="text-red-500 text-sm font-medium">{emailError}</div>)}
            <input type='password' placeholder='Enter password' onChange={(e) => {passwordTyping(e)}} className='min-w-72 p-2 rounded-xl border-none bg-white outline-slate-500 outline-double py-3 inset-ring'></input>
            {passwordError && (<div className="text-red-500 text-sm font-medium">{passwordError}</div>)}
            <button onClick={addUserInMongo} className='bg-[#30C58D] p-2 py-3 rounded-xl hover:bg-[#51e7ad] active:bg-[#68ffc5]'>SIGN UP</button>
            {signupError && (<div className="text-red-500 text-sm font-medium text-center">{signupError}</div>)}
            <div className='text-[#4C9FFD] cursor-pointer' onClick={goToSignIn}>Already have an account? Sign In</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;