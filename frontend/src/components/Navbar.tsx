import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaTimes, FaBars } from 'react-icons/fa';

import { AuthContext } from '../contexts/auth';

import './styles/Navbar.css';

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  const [nav, setNav] = useState(false);

  return (
    <div>
      <nav className='navbar'>
        <h1>
          <Link to='/'>Desafio Sharenergy</Link>
        </h1>
        <div onClick={() => setNav(!nav)} className="mobile-btn">
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        <div className={`links-wrapper ${nav ? 'active' : ''}`}>
          <div className='links'>

            <Link to='/cats'>Cats</Link>


            <Link to='/dogs'>Dogs</Link>


            <Link to='/users'>Controle de usuarios</Link>

          </div>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default Navbar;