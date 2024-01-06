import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import './header.scss';


export default function Header() {
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
          <Link className='me-4' to='/login'>Login</Link>
          <Link to='/register'>Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
