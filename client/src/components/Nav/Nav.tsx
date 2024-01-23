import React, { useContext } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import './nav.scss';
import { UserContext } from '../../context/user-context.js';


export default function Nav() {
  const { isLoggedIn } = useContext(UserContext);
  let { pathname } = useLocation();

  pathname = pathname.split('/')[1];




  return (
    <nav className='sl-nav items-center'>
      <ul className='flex flex-row justify-between items-center'>
        { isLoggedIn && pathname === 'dashboard' && (
          <>
            <li className='mr-4'>
              <Link to='/add-workout'>Add Workout</Link>
            </li>
            <li className='mr-4'>
              <Link to='/'>Workout History</Link>
            </li>
          </>
        )}
        { isLoggedIn && pathname === 'add-workout' && (
          <>
            <li className='mr-4'>
              <Link to='/add-exercise'>Add Exercise</Link>
            </li>
            <li className='mr-4'>
              <Link to=''>Reorder</Link>
            </li>
            <li className='mr-4'>
              <Link to=''>Complete/Save</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}