import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

function App() {
  const [count, setCount] = useState(0)

  let myObj = {
    username: "hitedh",
    age: 21
  }

  let newArr = [1,2,3]

  return (
    <>
      <h1 className='bg-blue-500 text-2xl p-4 rounded-2xl mb-4'>Tailwind test</h1>

      <Card username="orbitrix" someone={newArr} btnText="Click me"/>
      <Card username="Мохд Заид" btnText="visite me"/>
      <Card username="Ringtones_474" btnText="Click hera"/>
      <Card username="Xiaomi 15 Ultra" btnText="Click out the website"/>
      
    </>
  )
}



export default App
