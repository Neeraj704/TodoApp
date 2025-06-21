import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import cross from '../assets/cross.svg';

const EditTodo = ({ darkMode, puranaTitle, puranaDescription, setShowCreateTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [oldTitle] = useState(puranaTitle);
  const [oldDescription] = useState(puranaDescription);


  async function editTodoInMongo () {
    setShowCreateTodo(false);
    await axios.put('https://todoapp-vlmg.onrender.com/update/', {
      title : title,
      description : description,
      date: selectedDate,
      oldTitle: oldTitle,
      oldDescription: oldDescription
    });
    crossButton();
  };

  function crossButton () {
    setShowCreateTodo(false);
  };

  return (
    <div className=' dark:bg-[#343539] flex flex-col w-max gap-5 dark:text-white'>
      <div className="flex justify-between items-center align-middle">
        <div className="text-3xl font-bold underline">
          Edit Todo
        </div>
        <div>
          <img onClick={crossButton} src={cross} className='w-10 cursor-pointer hover:scale-90 active:scale-75'></img>
        </div>
      </div>
      <div>
        <input placeholder='Enter new title' className="dark:bg-[#343539] dark:border-white p-2 max-h-16 border border-black rounded-md w-[640px]" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div className="flex flex-row justify-between">
          <textarea placeholder="Enter new description..." value={description} onChange={(e) => setDescription(e.target.value)} className="border w-full flex-1 mr-5 rounded-lg pt-3 pl-2 border-black dark:bg-[#343539] dark:border-white"/>
          <div className={darkMode ? 'dark-datepicker' : ''}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              className="rounded-2xl"
            />
          </div>
      </div>
      <div>
        <button className="w-full bg-[#30C58D] hover:bg-[#51e7ad] active:bg-[#68ffc5] dark:hover:bg-[#ff7a6d] dark:active:bg-[#ff8f84] min-h-[42px] rounded-xl dark:bg-[#F7685C]" onClick={editTodoInMongo}>Update Todo</button>
      </div>
    </div>
  )
}

export default EditTodo