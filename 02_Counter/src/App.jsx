import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let [counter, setCounter] = useState(15);

  const addValue=() => {
    console.log("Clicked"), counter;
    setCounter(counter + 1)
  }
  
  const removeValue=() => {
    console.log("removed"), counter;
    setCounter(counter - 1)
  }

  return (


    <>
      <h1>Orbitrix aur react</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={removeValue}>remove value</button>
    </>
  )
}

export default App
