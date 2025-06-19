import React, { useState } from 'react'
import Modal from 'react-modal';
import CreateTodo from './CreateTodo';
import icon from '../assets/logo.png';
import home from '../assets/home.svg';
import logout from '../assets/logout.png';
import plus from '../assets/create.svg';
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
    <div className='flex bg-[#FFFDFA] flex-col w-[112px] h-screen justify-between top-0 gap-full py-10 items-center shadow-2xl fixed left-0'>
      <div>
        <img src={icon} className='cursor-pointer h-[48px]'></img>
      </div>
      <div className='flex flex-col gap-10'>
        <img src={home} className='cursor-pointer w-[32px] ml-0px grow'></img>
        <img onClick={handleOnClick} src={plus} className='cursor-pointer h-[32px] grow'/>
      </div>
      <div>
        <img onClick={clearToken} className='cursor-pointer max-w-9' src={logout} ></img>
      </div>
      <Modal className='bg-white bg-opacity-100 p-6 rounded-lg w-auto h-auto mx-auto my-auto outline-none' overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center" isOpen = {showCreateTodo} onRequestClose = {handleClose} contentLabel = "Create Todo Modal">
        <CreateTodo getTodos = {props.getTodos} setShowCreateTodo = {setShowCreateTodo}/>
      </Modal>
    </div>
  )
}

export default SideBar