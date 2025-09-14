import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components/index'
import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <>
      <h1 className='flex justify-center item-center text-7xl text-white'>
        <div className='w-full block'>
          <Header />
          <main>
            TODO: {/* <Outlet /> */}
          </main>
          <Footer />
        </div>
      </h1>
    </>
  ) : null
}

export default App
