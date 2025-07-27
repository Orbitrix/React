import React, { use, useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Repositories from './Repositories'

function Github() {
  const data = useLoaderData()
  console.log(data)
  // const [data, setData] = useState({})

  // useEffect(() => { 
  //   fetch('https://api.github.com/users/Orbitrix')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data)
  //       setData(data)
  //     })
  // }, [])

  return (
    <>
      <div className="flex justify-between gap-5 ml-20 mr-20 pl-32 pr-32">
        <div className='pt-12 pb-12 w-[30%]'>
          <img src={data.avatar_url} alt="Github Profile" className='w-64 border-[0.2px] border-gray-300 rounded-full' />
          <div className='text-2xl font-bold mt-3'>{data.name}</div>
          <p className='text-gray-500 text-2xl'>{data.login}</p>
          <div className='text-[18px] w-64'>{data.bio}</div>
        </div>
        <div className='pt-12 pb-12 w-[70%]'>
          <div className='flex justify-between'>
            <h2>Popular repositories</h2>
            <NavLink to={"https://github.com/Orbitrix"}><span className='text-blue-600 text-[14px] hover:underline'>Customize your pins</span></NavLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Repositories name='aichatOr'/>
            <Repositories />
            <Repositories />
            <Repositories />
            <Repositories />
            <Repositories />
          </div>


        </div>
      </div>
    </>
  )
}

export default Github

export const githubInfoLoder = async () => {
  const response = await fetch('https://api.github.com/users/Orbitrix')
  return response.json()
}