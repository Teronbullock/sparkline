import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './header.scss';
import { UserContext } from '../../context/user-context.js';


export default function Header() {
  const { isLoggedIn, setIsLoggedIn, setCurrentUser, setTokenInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setTokenInfo(null);
    navigate("/");
  }

  return (
    <header className='et-header'>
      <div className='container 2xl mx-auto flex flow-row justify-between h-inherit content-center'>
        <div className='inline-flex flex-row items-center'>
          <a className='me-8' href='/'>
            logo
          </a>
          <Nav />
        </div>
        <div className='inline-flex flex-row items-center'>
        { isLoggedIn ? (
          <>
            <Link className='me-4' to='/dashboard'>Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className='me-4' to='/login'>Login</Link>
            <Link to='/register'>Sign Up</Link>
          </>
        )}
        </div>
      </div>
    </header>
  );
}
