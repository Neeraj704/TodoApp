import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  
  async function checkUserFromMongo () {
    await axios.post('http://localhost:3000/signin', {
      email : email,
      password : password
    })
    .then ((res) => {
      const token = res.data.token;
      sessionStorage.setItem('jwtToken', token);
      navigate('/home');
    })
  };

  return (
    <div>
      <input placeholder='Enter email' onChange={(e) => {setEmail(e.target.value)}}></input>
      <input placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}}></input>
      <button onClick={checkUserFromMongo}>SIGN IN</button>
    </div>
  )
}

export default SignIn;