import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList, setTodoList] = useState([]);//getting item from backend and storing in the state
    
    const inputRef=useRef()
    const add = () => {
  const inputText = inputRef.current.value.trim();

  if (inputText === "") return;

  fetch("http://localhost:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: inputText })
  })
    .then(res => res.json())    
    .then(() => {
      fetchTasks(); // reload from backend
      inputRef.current.value = "";//clear input field after adding a task
    });
};

    const deleteTodo = (id) => {
  fetch(`http://localhost:5000/tasks/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => fetchTasks());
};

   const toggle = (id) => {
  fetch(`http://localhost:5000/tasks/${idnp}`, {
    method: "PUT"
  })
    .then(res => res.json())
    .then(() => fetchTasks());
};

        const fetchTasks = () => {
  fetch("http://localhost:5000/tasks")
    .then(res => res.json())
    .then(data => setTodoList(data));
};

useEffect(() => {
  fetchTasks();
}, []);

  return (
    <div className="bg-white w-full max-w-lg min-h-[400px]: rounded-xl p-6 sm:p-8 shadow-xl
    flex flex-col">

             {/* Title */}
        <div className='flex items-center gap-2 mb-6'>
            <img className='w-8' src={todo_icon} alt=""/>
                <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

             {/* Input Box */}

        <div className='flex flex-col sm:flex-row gap-3'>
            <input ref={inputRef} className="flex-1 px-4 py-3 rounded-full bg-gray-200 outline-none"  
            type='text' placeholder='Add your Task'/>
            <button onClick={add} className="px-6 py-3 
            rounded-full bg-orange-600 text-white">ADD+</button>
        </div>

        <div>

          {todoList.map((item) => {
          return (
            <TodoItems
              key={item._id}
              text={item.text}
              id={item._id}
              iscomplete={item.iscomplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          )
        })}
            

        </div>

    </div>
  )
}

export default Todo