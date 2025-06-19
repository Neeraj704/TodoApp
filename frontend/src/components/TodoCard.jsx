import React, { useState, useMemo, useEffect } from 'react';
import edit from '../assets/edit.svg';
import { format } from 'date-fns';
import Modal from 'react-modal';
import EditTodo from './EditTodo';
import axios from 'axios';
import { useDrag } from 'react-dnd';



const TodoCard = ({ title, description, onStartDrag, date, onEndDrag, status: initialStatus}) => {
  const [showCreateTodo, setShowCreateTodo] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const formattedDate = format(new Date(date), 'do MMMM, yyyy'); 
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'TODO',
    item: { title, description },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => onEndDrag(),
  }));
  useEffect(() => {
    if (isDragging) {
      onStartDrag();
    }
  }, [isDragging]);

  const colors = [
    'rgba(251, 235, 149, 0.4)',  
    'rgba(253, 186, 163, 0.4)',   
    'rgba(182, 165, 203, 0.4)',   
    'rgba(174, 223, 232, 0.6)',   
    'rgba(151, 210, 188, 0.6)',  
  ];

  const toggleStatus = async () => {
    const newStatus = !status;
    setStatus(newStatus);

    await axios.put('http://localhost:3000/update', {
      oldTitle: title,
      oldDescription: description,
      status: newStatus
    });
  };

  const randomBg = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []);

  const handleOnClick = () => {
    setShowCreateTodo(true);
  };

  const handleClose = () => {
    setShowCreateTodo(false);
  };

  return (
      <div ref={drag} className={`border border-gray-300 shadow-md my-5 w-[264px] relative h-[240px] rounded-xl p-7 mr-9 hover:scale-105 transition-transform duration-200 ${isDragging ? 'opacity-80 scale-105' : 'opacity-100 scale-100'}`} style={{ backgroundColor: randomBg }}>
        <div>
          <img src={edit} onClick={handleOnClick} className='select-none cursor-pointer w-7 absolute top-[29px] right-[25px] hover:scale-90 active:scale-75'></img>
          <h2 className='select-none text-xl font-bold underline mb-3 w-[180px] text-black line-clamp-1'>{title}</h2>  
        </div>   
        <div>
          <p className='select-none text-base font-medium text-black max-h-[100px] overflow-y-auto scrollbar-hide break-words'>{description}</p>
        </div>  
        <div>
          <p className='select-none absolute bottom-[24px] text-sm left-[28px] '>{formattedDate}&nbsp;&nbsp;&nbsp;&nbsp;&middot;</p>
          <p onClick={toggleStatus} className={`select-none px-2 absolute bottom-[20px] right-[28px] p-1 rounded-lg text-sm cursor-pointer ${status ? 'bg-[#30C58D]' : 'bg-[#F7685C]'}`}>{status ? 'Completed' : 'Incomplete'}</p>
        </div>
        <Modal className='bg-white bg-opacity-100 p-6 rounded-lg w-auto h-auto mx-auto my-auto outline-none' overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center" isOpen = {showCreateTodo} onRequestClose = {handleClose} contentLabel = "Create Todo Modal">
          <EditTodo puranaTitle = {title} puranaDescription = {description} setShowCreateTodo = {setShowCreateTodo}/>
        </Modal>
      </div>  
  )
}

export default TodoCard