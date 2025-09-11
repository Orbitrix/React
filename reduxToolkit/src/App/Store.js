import { configureStore } from '@reduxjs/toolkit'
import { todoReducer } from '../features/todo/TodoSlice'

const LOCAL_KEY = "saveTodos"

export const store = configureStore({
    reducer: {
        Todo: todoReducer,
    },
    
})

store.subscribe(() => {
    try {
        if (typeof window === 'undefined') return
        const todos = store.getState().Todo?.todos ?? []
        localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
    } catch {
        // ignore
    }
})

export default store;