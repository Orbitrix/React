import { useEffect, useState } from "react"
import { ThemeProvider } from "./contexts/theme"
import ThemeBtn from "./components/ThemeBtn"
import Card from "./components/Card"

function App() {
  // Initialize theme from localStorage or system preference
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme

    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  })

  // Theme toggle handlers
  const toggleTheme = () => {
    setThemeMode(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  const lightTheme = () => {
    setThemeMode('light')
    localStorage.setItem('theme', 'light')
  }

  const darkTheme = () => {
    setThemeMode('dark')
    localStorage.setItem('theme', 'dark')
  }

  // Update HTML class and apply transitions
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(themeMode)

    // Apply smooth transition class
    root.classList.add('theme-transition')

    // Remove transition class after animation completes
    const timer = setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 300)

    return () => clearTimeout(timer)
  }, [themeMode])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light'
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setThemeMode(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <ThemeProvider value={{ themeMode, lightTheme, darkTheme, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${themeMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="w-full py-11 ">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <Card />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
