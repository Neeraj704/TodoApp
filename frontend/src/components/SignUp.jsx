import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  
  async function addUserInMongo () {
    axios.post('http://localhost:3000/signup', {
      username : username,
      password : password
    })
    .then ((res) => {
      console.log(res.data);
    })
    .catch ((err) => {
      console.log(err);
    });
  } 

  return (
    <div>
      <input placeholder='Enter username' onChange={(e) => {setUsername(e.target.value)}}></input>
      <br></br>
      <br></br>
      <input placeholder='Enter password' onChange={(e) => {setPassword(e.target.value)}}></input>
      <br></br>
      <br></br>
      <button onClick={addUserInMongo}>SIGN UP</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default SignUp;