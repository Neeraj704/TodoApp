import React from 'react';
import axios from 'axios';

const TodoCard = (props) => {

  return (
    <div>
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>{props.date}</p>
    </div>
    </div>
  )
}

export default TodoCard