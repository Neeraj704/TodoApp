import { useState } from 'react'
import './App.css'
import CreateTodo from './components/CreateTodo'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import LogOut from './components/LogOut'
import axios from 'axios'

function App() { 
  axios.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  
  return (
    <>
    <SignUp></SignUp>
    <SignIn></SignIn>
    <CreateTodo></CreateTodo>
    <LogOut></LogOut>
    </>
  )
}

export default App
