import { configureStore, createSlice, nanoid } from "@reduxjs/toolkit";

export const initialState = {
    todos: [{ id: 1, text: "Hello world" }]
}


export const todoSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
        addTodo: (state, action) => { 
            const todo = {
                id: nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => { 
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
    }
})

export default todoSlice.reducer