import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import CreateTodo from './components/CreateTodo'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import LogOut from './components/LogOut'
import axios from 'axios'
import SideBar from './components/SideBar';
import BasicText from './components/BasicText';
import Theme from './components/Theme';
import TodoCard from './components/TodoCard';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() { 
  axios.interceptors.request.use(
    function (config) {
      const token = sessionStorage.getItem('jwtToken');
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
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/home" element={
          <>
          <BasicText></BasicText>
          <SideBar></SideBar>
          <Theme></Theme>
          <TodoCard></TodoCard>
          </>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
