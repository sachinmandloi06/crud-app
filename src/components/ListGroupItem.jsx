import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTodo, edit, removeTodo } from '../features/todos/todoSlice'

const ListGroupItem = ({todo}) => {
  const dispatch = useDispatch()
  const { isSuccess } = useSelector((state) => state.todos)

  const handleDelete = (id) => {
     dispatch(deleteTodo(id))
     if(isSuccess){
      dispatch(removeTodo(id))
     }
  }

  const handleEdit = (todo) => {
     dispatch(edit(todo))
  }

  return (
    <li className='list-group-item rounded-0 my-1 shadow-sm'>
        <h1>Title: {todo.title}</h1>
        <p className='text-secondary'>Description: {todo.description}</p>
        <span className='float-end'>
        <button 
        onClick={() => handleEdit(todo)}
        className='btn btn-primary btn-sm'>Edit</button>
        <button 
        onClick={() => handleDelete(todo._id)}
        className='mx-2 btn btn-danger btn-sm'>Delete</button>

        </span>
    </li>
  )
}

export default ListGroupItem
