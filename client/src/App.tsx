import { useContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './assets/sass/main.scss';
import { UserContext } from './context/user-context.js';
import Home from './routes/Home';
import Registration from './routes/registration';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard.js';
import Workout from './routes/Workout.js';
import Exercise from './routes/Exercise.js';



export default function App() {
  const { isLoggedIn, setIsLoggedIn, tokenInfo, setTokenInfo } = useContext(UserContext);

  useEffect(() => {
    const rawData = localStorage.getItem('userData');
    const storedData = rawData ? JSON.parse(rawData) : null;

    if (storedData && storedData.token) {
      setIsLoggedIn(true);
      setTokenInfo(storedData.token);
    }

  }, [setIsLoggedIn, setTokenInfo, tokenInfo]);


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registration />} />
      { isLoggedIn ? (null) : (<Route path="/login" element={<Login />} />) }
      { isLoggedIn ? (
        <>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-workout" element={<Workout />} />
        <Route path="/add-exercise" element={<Exercise />} />
        </>
        ) : (null) }
      {}
    </ Routes>
  )
}