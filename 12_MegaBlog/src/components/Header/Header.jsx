import React from 'react'
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Header() {

  const authState = useSelector((state) => state.auth.status)
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'signup',
      slug: '/signup',
      active: !authState
    },
    {
      name: 'All Posts',
      slug: '/All-Posts',
      active: authState,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authState,
    }
  ]


  return (
    <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div mr-4>
            <Link to='/'>
              <Logo />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((Item) => 
            Item.active ? (
              <li key={Item.name}>
                <button
                onClick={() => navigate(Item.slug)}
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{Item.name}</button>
              </li>
            ) : null
            )}
            {authState && (
              <li>
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