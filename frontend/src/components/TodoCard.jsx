import React, { useState, useMemo } from 'react';
import edit from '../assets/edit.svg';
import { format } from 'date-fns';


const TodoCard = (props) => {
  const formattedDate = format(new Date(props.date), 'do MMMM, yyyy'); 
  const colors = [
  'rgba(251, 235, 149, 0.4)',  
  'rgba(253, 186, 163, 0.4)',   
  'rgba(182, 165, 203, 0.4)',   
  'rgba(174, 223, 232, 0.6)',   
  'rgba(151, 210, 188, 0.6)',  
];

  const randomBg = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }, []);

  return (
      <div className='bg-red-400 my-5 max-w-[264px] relative  h-[240px] rounded-xl p-7 mr-9' style={{ backgroundColor: randomBg }}>
        <img src={edit} className='w-7 absolute top-[29px] right-[25px] '></img>
        <h2 className='text-xl font-bold underline mb-3'>{props.title}</h2>   
        <p className='font-medium text-lg '>{props.description}</p>
        <p className='absolute bottom-[24px] text-sm left-[28px] '>{formattedDate}&nbsp;&nbsp;&nbsp;&nbsp;&middot;</p>
        <p className='absolute bottom-[20px] right-[28px] bg-[#F7685C] p-1 rounded-lg text-sm '>Incomplete</p>
      </div>
  )
}

export default TodoCard