import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  function addTodoInMongo () {
    axios.post('http://localhost:3000/create', {
      title : title,
      description : description
    })
    .then ((res) => {
      console.log(res)
    }) 
    .catch ((err) => {
      console.log(err)
    });
  };
  
  
  return (
    <div>
      <input placeholder='Enter title' onChange={(e) => setTitle(e.target.value)}></input>
      <br></br>
      <br></br>
      <input placeholder='Enter description' onChange={(e) => setDescription(e.target.value)}></input>
      <br></br>
      <br></br>
      <button onClick={addTodoInMongo}>Add Todo</button>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default CreateTodo;