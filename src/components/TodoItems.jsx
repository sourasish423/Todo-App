import React from 'react'
import tick from '../assets/tick.png'
import not_tick from '../assets/not_tick.png'
import delete_icon from '../assets/delete.png'

const TodoItems = ({text,id,iscomplete,deleteTodo,toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2 w-full'>

        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer min-w-0'>
            <img src={iscomplete? tick: not_tick} alt=""  className='w-7'/>
            <p className={`text-slate-700 ml-4 text-sm sm:text-base wrap-break-word
             ${iscomplete?"line-through decoration-slate-500" : ""}`}>{text}</p>
        </div>

        <img onClick={()=>{deleteTodo(id)}}
        src={delete_icon} alt="" className='w-5 cursor-pointer'/>
      

        <div>

        </div>
        </div>
  )
}

export default TodoItems