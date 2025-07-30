import React from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

function User() {
    const {userid} = useParams()
    const { darkMode } = useTheme()
    
    return (
    <div className={`flex justify-center text-3xl p-4 transition-colors duration-300 ${
      darkMode ? 'bg-gray-800 text-white' : 'bg-gray-600 text-white'
    }`}>
      User: {userid}
    </div>
  )
}

export default User