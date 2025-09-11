import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'

function Todo() {
  const todos = useSelector((state) => state?.Todo?.todos ?? [])

  if (!todos.length) return <div className="p-4">No todos yet</div>

  return (
    <>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </>
  )
}

export default Todo