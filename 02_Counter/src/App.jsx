import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  let [counter, setCounter] = useState(0);

  const addValue = () => {
    console.log("Clicked", counter);
    if (counter < 20) {
      setCounter(prevCounter => prevCounter + 1);
      setCounter(prevCounter => prevCounter + 1);
      setCounter(prevCounter => prevCounter + 1);
      setCounter(prevCounter => prevCounter + 1);
    }
  }

  const removeValue = () => {
    console.log("removed"), counter;
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }

  return (
    <>
      <h1>Orbitrix aur react</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value</button>
      {/* <br /> */}
      <button onClick={removeValue}>remove value</button>
    </>
  )
}

export default App
