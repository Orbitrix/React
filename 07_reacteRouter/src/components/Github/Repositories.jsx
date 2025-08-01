import React from 'react'
import { NavLink } from 'react-router-dom'

function Repositories({name, lang, visible, url, updated, darkMode}) {
  return (
    <div className={`border-t p-4 ${
      darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
    }  transition-colors duration-200 hover:shadow-md`}>
      <div>
        <div className='flex  items-center'>
          <NavLink
          target='_blank' 
            to={url}
            className={`text-[22px] text-blue-600 hover:underline ${
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }  font-medium`}
          >
            {name}
          </NavLink>
          <span className={`m-2 px-2 py-1 text-sm border-1 rounded-full ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}>
            {visible}
          </span>
        </div>
        <div className='h-2'></div>
        <p className={`text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {lang} 
          <span className='mx-4'>Updated: {updated}</span>
        </p>
      </div>
    </div>
  )
}

export default Repositories