import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const CreateTodo = ({ getTodos, setShowCreateTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const dateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  
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
    <div>
      <div>Create Todo</div>
      <button onClick={crossButton}>XX</button>
      <input type="date" id="date-input" value={selectedDate} onChange={dateChange}></input>
      <input placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <input placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <button onClick={addTodoInMongo}>Add Todo</button>
    </div>
  );
};

export default CreateTodo;