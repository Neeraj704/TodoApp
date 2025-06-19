import React, { useState } from 'react'
import Modal from 'react-modal';
import CreateTodo from './CreateTodo';
import icon from '../assets/logo.png';
import home from '../assets/home.svg';
import logout from '../assets/logout.png';
import logoutd from '../assets/logoutd.png';
import plus from '../assets/create.svg';
import plusd from '../assets/created.svg'; 
import homed from '../assets/homed.svg';
import { useNavigate } from 'react-router-dom';


const SideBar = (props) => {
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const navigate = useNavigate();
  function clearToken () {
    sessionStorage.removeItem('jwtToken');
    navigate('/signin');
  };
 
  const handleOnClick = () => {
    setShowCreateTodo(true);
  };

  const handleClose = () => {
    setShowCreateTodo(false);
  };

  return (
    <div className='flex bg-[#FFFDFA] dark:bg-[#3C3D43] flex-col w-[112px] h-screen justify-between top-0 gap-full py-10 items-center shadow-2xl fixed left-0 '>
      <div>
        <img src={icon} className='cursor-pointer h-[48px]'></img>
      </div>
      <div className='flex flex-col gap-10'>
        <img src={props.darkMode ? homed : home} className='cursor-pointer w-[32px] ml-0px grow hover:scale-90 active:scale-75'></img>
        <img onClick={handleOnClick} src={props.darkMode ? plusd : plus} className='cursor-pointer h-[32px] grow hover:scale-90 active:scale-75'/>
      </div>
      <div>
        <img onClick={clearToken} className='cursor-pointer max-w-9 hover:scale-90 active:scale-75' src={props.darkMode ? logoutd : logout} ></img>
      </div>
      <Modal className='bg-white bg-opacity-100 dark:bg-[#343539]  p-6 rounded-lg w-auto h-auto mx-auto my-auto outline-none' overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center" isOpen = {showCreateTodo} onRequestClose = {handleClose} contentLabel = "Create Todo Modal">
        <CreateTodo getTodos = {props.getTodos} darkMode={props.darkMode} setShowCreateTodo = {setShowCreateTodo}/>
      </Modal>
    </div>
  )
}

export default SideBar