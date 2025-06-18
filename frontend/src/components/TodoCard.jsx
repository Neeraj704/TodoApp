import React, { useState } from 'react';


const TodoCard = (props) => {

  return (
      <div className='bg-red-500'>
        <button>Test</button>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>Incomplete</p>
        <p>{props.date}</p>
      </div>
  )
}

export default TodoCard