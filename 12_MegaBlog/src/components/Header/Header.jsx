import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const authState = useSelector((state) => state?.auth?.status)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Signup', slug: '/signup', active: !authState },
    { name: 'All Posts', slug: '/All-Posts', active: authState },
    { name: 'Add Post', slug: '/add-post', active: authState },
  ]

  return (
    <header className="py-3 shadow bg-black">
      <Container>
        {/* responsive header: logo left, nav right on md+, mobile hamburger on small screens */}
  <nav className="w-full bg-gradient-bg border-0 md:border-2 border-white flex flex-wrap md:flex-nowrap px-3 md:px-4 py-2 md:py-3 rounded-md md:rounded-2xl items-center justify-between">
          <div className="flex items-center justify-between gap-64">
            <Link to="/" className="mr-4">
              <Logo />
            </Link>
            <button className="md:hidden text-white" onClick={() => setOpen((s) => !s)} aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          <ul className={`flex flex-col md:flex-row md:items-center md:space-x-2 ml-0 md:ml-auto ${open ? 'block' : 'hidden md:flex'}`}>
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="md:my-0 my-2">
                    <button
                      onClick={() => { setOpen(false); navigate(item.slug) }}
                      className="inline-block px-6 py-2 duration-200 hover:bg-white hover:text-black rounded-full text-white font-bold"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authState && (
              <li className="md:my-0 my-2">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
