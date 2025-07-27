import React from 'react'
import { NavLink } from 'react-router-dom'

function Repositories({name}) {
  return (
    <>
    <div className='border-1 border-gray-500 rounded-md w-full p-[16px]'>
        <div >
        <div className='flex justify-between'>
            <span className='text-blue-600'><NavLink>{name}</NavLink></span>
            <span className='text-gray-500 pl-1 pr-1 border-1 rounded-2xl'>Publis</span>
        </div>
        <p className='w-full h-3'></p>
        <p><span>JavaScript</span></p>
        </div>
    </div>
    </>
  )
}

export default Repositories