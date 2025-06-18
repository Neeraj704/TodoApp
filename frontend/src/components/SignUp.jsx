import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  async function addUserInMongo () {
    await axios.post('http://localhost:3000/signup', {
      username : username,
      password : password,
      email: email
    })
  };

  return (
    <div>
      <input placeholder='Enter username' onChange={(e) => {setUsername(e.target.value)}}></input>
      <input placeholder='Enter email' onChange={(e) => {setEmail(e.target.value)}}></input>
      <input placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}}></input>
      <button onClick={addUserInMongo}>SIGN UP</button>
    </div>
  )
}

export default SignUp;