import { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Registration from './routes/registration';
import Login from './routes/Login';
import Dashboard from './routes/dashboard';
import './assets/sass/main.scss';
import { UserContext } from './context/user-context.js';



export default function App() {
  const { isLoggedIn } = useContext(UserContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const rawData = localStorage.getItem('userData');
    const storedData = rawData ? JSON.parse(rawData) : null;
    

  }, []);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      { isLoggedIn ? (<Route path="/dashboard" element={<Login />} />) : (null) }
      <Route path="/dashboard" element={<Dashboard />} />
    </ Routes>
  )
}