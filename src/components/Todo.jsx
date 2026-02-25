import React, { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'

const Todo = () => {

    const[todoList,setTodoList]=useState(localStorage.getItem("todos")?
        JSON.parse(localStorage.getItem("todos")):[]);//getting item from local storage convert it from string to array and display it after refresh
    
    const inputRef=useRef()
    const add=()=>{
        const inputText=inputRef.current.value.trim();

        if(inputText===""){
            return null;
        }

        const newTodo={
            id:Date.now(),
            text:inputText,
            iscomplete:false,
        }
        setTodoList((prev)=>[...prev,newTodo]);
        inputRef.current.value="";//after adding the todo item in the list clear the input field
    }

    const deleteTodo=(id)=>{
        setTodoList((prvTodos)=>{
            return prvTodos.filter((todo)=>
            todo.id!==id)
        })

    }

    const toggle=(id)=>{
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id===id){
                    return {...todo,iscomplete:!todo.iscomplete}//before this all the item is false when I click it changes means only property is being changed
                }
                return todo;
            })
        })
    }

        useEffect(()=>{
            localStorage.setItem("todos",JSON.stringify(todoList))
        },[todoList])//store the items in local storage and convert it into string from array


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

            {todoList.map((item,index)=>{
                return <TodoItems key={index}
                text={item.text}
                id={item.id}
                iscomplete={item.iscomplete}
                deleteTodo={deleteTodo}
                toggle={toggle}/>
            })}
            

        </div>

    </div>
  )
}

export default Todo