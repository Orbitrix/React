import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import PopularRepositories from './PopularRepositories'
import { useTheme } from '../../context/ThemeContext'
import Repositories from './Repositories'

function Github() {
  const data = useLoaderData()
  const [datas, setDatas] = useState([])
  const { darkMode, toggleTheme } = useTheme()

  useEffect(() => {
    fetch('https://api.github.com/users/Orbitrix/repos')
      .then(async response => {
        const dat = await response.json();
        setDatas(dat)
      })
  }, [])

  console.log(datas)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Profile Section */}
          <div className='lg:w-1/3'>
            <img
              src={data.avatar_url}
              alt="Github Profile"
              className='w-48 md:w-64 mx-auto lg:mx-0 border-[0.2px] border-gray-300 rounded-full shadow-lg'
            />
            <div className='text-xl md:text-2xl font-bold mt-4'>{data.name}</div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} text-xl md:text-2xl`}>{data.login}</p>
            <div className='text-base md:text-lg max-w-xs mt-2'>{data.bio}</div>
            <NavLink to={data.html_url} target='_blank' >
              <button className='w-full lg:w-auto rounded-md mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg md:text-xl p-2 transition duration-200'>
                Visit Github Profile
              </button>
            </NavLink>
          </div>

          {/* Repositories Section */}
          <div className='lg:w-2/3'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl md:text-2xl font-bold'>Popular repositories</h2>
              <NavLink to={"https://github.com/Orbitrix"}>
                <span className='text-blue-600 dark:text-blue-400 text-medium hover:underline'>
                  Repositories
                </span>
              </NavLink>
            </div>

            {/* <div id='repos'>
              {datas.map((i, index) => (
                <Repositories
                  key={index}
                  name={i.name}
                  lang={i.language}
                  visible={i.visibility}
                  url={i.html_url}
                  updated={i.updated_at}
                  darkMode={darkMode}
                />
              ))}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id='info'>
              {datas.slice(0, 6).map((i, index) => (
                <PopularRepositories
                  key={index}
                  name={i.name}
                  lang={i.language}
                  visible={i.visibility}
                  url={i.html_url}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg transition-colors duration-200
          bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default Github

export const githubInfoLoder = async () => {
  const response = await fetch('https://api.github.com/users/Orbitrix')
  return response.json()
}

