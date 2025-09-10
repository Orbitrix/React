import { useState } from 'react'
import './App.css'

function App() {
  console.log(import.meta.env.VITE_APPWRITE_URL)
  return (
    <>
      <h1 className='flex justify-center item-center text-7xl text-white'>A blog app with appwrite</h1>
    </>
  )
}

export default App
