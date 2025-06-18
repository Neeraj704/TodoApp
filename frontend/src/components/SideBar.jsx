import React, { useState } from 'react'
import axios from 'axios';
import Modal from 'react-modal';
import CreateTodo from './CreateTodo';


const SideBar = () => {
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
    <div>
      <button>Logo</button>
      <button>Home</button>
      <button onClick={handleOnClick}>Create</button>
      <button onClick={clearToken}>Log Out</button>
      <Modal
        isOpen={showCreateTodo}
        onRequestClose={handleClose}
        contentLabel="Create Todo Modal"
      >
        <CreateTodo setShowCreateTodo={setShowCreateTodo} />
      </Modal>
    </div>
  )
}

export default SideBar