import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cross from '../assets/cross.svg';

const CreateTodo = ({ getTodos, setShowCreateTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  
  async function addTodoInMongo () {
    axios.post('http://localhost:3000/create', {
      title : title,
      description : description,
      date: selectedDate
    });
    await getTodos();
    setTitle('');
    setDescription('');
    setSelectedDate('');
  };

  function crossButton () {
    setShowCreateTodo(false);
    getTodos();     
  };
  
  
  return (
    <div className='flex flex-col w-max gap-5'>
      <div className="flex justify-between items-center align-middle">
        <div className="text-3xl font-bold underline">
          Create Todo
        </div>
        <div>
          <img onClick={crossButton} src={cross} className='w-10 cursor-pointer hover:scale-90 active:scale-75'></img>
        </div>
      </div>
      <div>
        <input placeholder='Enter title' className="p-2 max-h-16 border border-black rounded-md w-[640px]" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div className="flex flex-row justify-between">
          <textarea placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)} className="border w-full flex-1 mr-5 rounded-lg pt-3 pl-2 border-black"/>
          <DatePicker className="inline-block rounded-5xl" selected={selectedDate} onChange={(date) => setSelectedDate(date)} inline/>
      </div>
      <div>
        <button className="w-full bg-[#30C58D] min-h-[42px] rounded-xl" onClick={addTodoInMongo}>Add Todo</button>
      </div>
    </div>
  );
};

export default CreateTodo;