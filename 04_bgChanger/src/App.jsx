import { useState } from 'react'


function App() {
  const [color, setColor] = useState("#222")


  return (

    <div className='w-full h-screen duration-200' style={{ backgroundColor: color }}>
      {/* <input className='border-amber-50' type="color" onChange={(e)=> setColor(e.target.value)}/> */}
      <div className='fixed flex flex-wrap justify-center bottom-12 inset-x-0 px-2'>
        <div className='flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl'>
          <button
          onClick={() => setColor("red")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "red"}}
          >Red</button>
          <button
          onClick={() => setColor("green")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "green"}}
          >Green</button>
          <button
          onClick={() => setColor("blue")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "blue"}}
          >blue</button>
          <button
          onClick={() => setColor("orange")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "orange"}}
          >Orange</button>
          <button
          onClick={() => setColor("yellow")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "yellow"}}
          >Yellow</button>
          <button
          onClick={() => setColor("aqua")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "aqua"}}
          >Aqua</button>
          <button
          onClick={() => setColor("silver")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "silver"}}
          >Silver</button>
          <button
          onClick={() => setColor("navy")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "navy"}}
          >Navy</button>
          <button
          onClick={() => setColor("cyan")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "cyan"}}
          >Cyan</button>
          <button
          onClick={() => setColor("teal")}
          className='outline-none px-4 py-1 rounded-full text-white shadow-lg'
          style={{backgroundColor: "teal"}}
          >Teal</button>
        </div>
      </div>
      
    </div>


  )
}



export default App
