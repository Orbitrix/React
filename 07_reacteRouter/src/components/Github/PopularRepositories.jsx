import React from 'react'
import { NavLink } from 'react-router-dom'

function PopularRepositories({name, lang, visible, url, darkMode}) {
  return (
    <div className={`border rounded-md p-4 ${
      darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    } transition-colors duration-200 hover:shadow-md`}>
      <div>
        <div className='flex justify-between items-center'>
          <NavLink
          target='_blank' 
            to={url}
            className={`text-blue-600 hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            } font-medium`}
          >
            {name}
          </NavLink>
          <span className={`px-2 py-1 text-sm rounded-full ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {visible}
          </span>
        </div>
        <div className='h-8'></div>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {lang}
        </p>
      </div>
    </div>
  )
}

export default PopularRepositories