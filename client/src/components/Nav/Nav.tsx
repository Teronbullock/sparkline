import React, { useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './nav.scss';
import { UserContext } from '../../context/user-context.js';


export default function Nav() {
  const { isLoggedIn } = useContext(UserContext);
  const [queryParameters] = useSearchParams();
  const url = new URL(window.location.href);
  // const { }

  console.log(new URL());
  return (
    <nav className='et-nav items-center'>
      <ul className='flex flex-row justify-between items-center'>
        { isLoggedIn ? (
        
          <>
            <li className='mr-4'>
              <Link to='/'>Exercise Tracker {queryParameters.get("name")}</Link>
            </li>
            <li className='mr-4'>
              <Link to='/'>Track Progress</Link>
            </li>
            <li className='mr-4'>
              <Link to='/'>Set Goals</Link>
            </li>
          </>
        ) : (
          <>
          </>
        )}
      </ul>
    </nav>
  )
}