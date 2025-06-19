import React, { useState } from 'react'
import Modal from 'react-modal';
import CreateTodo from './CreateTodo';
import icon from '../assets/icon.png';
import home from '../assets/home.svg';
import logout from '../assets/logout.svg';
import create from '../assets/create.svg';


const SideBar = (props) => {
const [showCreateTodo, setShowCreateTodo] = useState(false);
  function clearToken () {
    sessionStorage.removeItem('jwtToken');
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
        <img src={icon} className='h-[48px]'></img>
      </div>
      <div className='flex flex-col gap-10'>
        <img src={home} className='w-[32px] ml-0px grow'></img>
        <img onClick={handleOnClick} src={create} className='h-[32px] grow'/>
      </div>
      <div>
        <img onClick={clearToken} src={logout} ></img>
      </div>
      <Modal
        isOpen = {showCreateTodo}
        onRequestClose = {handleClose}
        contentLabel = "Create Todo Modal"
      >
        <CreateTodo 
          getTodos = {props.getTodos}
          setShowCreateTodo= {setShowCreateTodo}
        />
      </Modal>
    </div>
  )
}

export default SideBar