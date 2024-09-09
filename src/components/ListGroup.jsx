import React, { useEffect } from 'react'
import ListGroupItem from './ListGroupItem'
import { useDispatch, useSelector } from 'react-redux'
import { getTodos } from '../features/todos/todoSlice'

const ListGroup = () => {

const {allTodos , isLoading , isError} = useSelector((state) => state.todos)

const dispatch = useDispatch()

useEffect(() => {
   dispatch(getTodos());
},[])

if(isLoading){
  return(
    <h1 className='text-center text-secondary my-3 display-6'>Loading...</h1>
  )
}

if(isError){
  return(
    <h1 className='text-center text-danger my-3 display-6'>404 Something Went Wroung ...</h1>
  )
}


if (allTodos.length === 0){
  return(
    <h1 className='text-center text-secondary my-3 display-6'>No Todo Yet</h1>
  )
}

  return (
    <ul className='list-group my-3'>
    {
      allTodos.map(todo => <ListGroupItem key={todo._id} todo={todo}/>)
    }
    </ul>
  )
}

export default ListGroup
