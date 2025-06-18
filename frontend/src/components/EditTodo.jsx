import React from 'react'

const EditTodo = () => {

  return (
    <div>
      <div>Create Todo</div>
      <button onClick={crossButton}>X</button>
      <input type="date" id="date-input" value={selectedDate} onChange={dateChange}></input>
      <input placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}></input>
      <input placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}></input>
      <button onClick={addTodoInMongo}>Add Todo</button>
    </div>
  )
}

export default EditTodo