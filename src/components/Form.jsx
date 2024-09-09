import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, updateTodo } from '../features/todos/todoSlice'

const Form = () => {

  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")

  const {edit} = useSelector((state) => state.todos)

   const dispatch = useDispatch()

   const handleSubmit = (e) => {
    e.preventDefault()
    edit.isEdit ? dispatch(updateTodo({_id : edit.todo._id , title , description})) : dispatch(addTodo({title , description}));
    setTitle("")
    setDescription("")
   }
    
   useEffect(()=>{
      setTitle(edit.todo.title)
      setDescription(edit.todo.description)
   },[edit])

  return (
    <form className='my-3' onSubmit={handleSubmit}>
    <input 
    type="text"
    placeholder='Enter Title'
    className='form-control rounded-0 my-2 required'
    value={title}
    onChange={e => setTitle(e.target.value)} />
    <textarea 
    type="text"
    placeholder='Enter Description'
    className='form-control rounded-0 my-2 required'
    value={description}
    onChange={e => setDescription(e.target.value)}></textarea>
    <button className='btn btn-success w-100 rounded-0 my-2'>Submit</button>
    
    </form>
  )
}

export default Form
