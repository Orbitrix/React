import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeTodo, updatTodo } from '../features/todo/TodoSlice'

function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(todo.text || '')

  useEffect(() => {
    setText(todo.text || '')
  }, [todo.text])

  const save = () => {
    const v = text.trim()
    if (!v) return
    dispatch(updatTodo({ id: todo.id, text: v }))
    setIsEditing(false)
  }

  const cancel = () => {
    setText(todo.text || '')
    setIsEditing(false)
  }

  return (
    <div className="flex items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black bg-[#f2f2f2] w-full">
      {isEditing ? (
        <input
          className="flex-1 border px-2 py-1 rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') save()
            if (e.key === 'Escape') cancel()
          }}
          autoFocus
        />
      ) : (
        <div className="flex-1 truncate">{todo.text}</div>
      )}

      {isEditing ? (
        <>
          <button
            className="inline-flex ml-1 px-2 py-1 rounded bg-green-600 text-white"
            onClick={save}
            title="Save"
          >
            Save
          </button>
          <button
            className="inline-flex ml-1 px-2 py-1 rounded bg-gray-200"
            onClick={cancel}
            title="Cancel"
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            className="inline-flex ml-1 px-2 py-1 rounded bg-yellow-200"
            onClick={() => setIsEditing(true)}
            title="Edit"
          >
            Edit
          </button>
          <button
            className="inline-flex ml-1 px-2 py-1 rounded bg-red-100"
            onClick={() => dispatch(removeTodo(todo.id))}
            title="Delete"
          >
            ❌
          </button>
        </>
      )}
    </div>
  )
}

export default TodoItem
