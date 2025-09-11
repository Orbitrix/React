import { createSlice, nanoid } from "@reduxjs/toolkit";

const LOCAL_KEY = "saveTodos";

const loadTodos = () => {
    try {
        if (typeof window === "undefined") return [{ id: 1, text: "Hello world" }];
        const raw = localStorage.getItem(LOCAL_KEY);
        return raw ? JSON.parse(raw) : [{ id: 1, text: "Hello world" }];
    } catch {
        return [{ id: 1, text: "Hello world" }];
    }
}

export const initialState = {
    todos: loadTodos()
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
        updatTodo: (state, action) =>{
            const {id, text} = action.payload
            const idx = state.todos.findIndex(t => t.id === id);
            if (idx !== -1) state.todos[idx].text = text;
        }
    }
})

export const { addTodo, removeTodo, updatTodo } = todoSlice.actions
export const todoReducer = todoSlice.reducer
export default todoSlice.reducer