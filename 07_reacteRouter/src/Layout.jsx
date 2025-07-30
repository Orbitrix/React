import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ThemeToggleButton from './components/ThemeToggleButton'
import { useTheme } from './context/ThemeContext'

function Layout() {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <ThemeToggleButton />
    </div>
  )
}

export default Layout