import React from 'react';
import Home from './components/home/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { getPostsFromFollowingByUserId } from './api/api';

function App() {
  const token = null;

  if (!token) {
    return (
      <div className='login_form'>
        <CssBaseline />
        <Login />
      </div>
    );
  }

  const test = async () => {
    const response = await getPostsFromFollowingByUserId(1234);
    console.log(response.data);
  };

  test();

  return <div></div>;
}

export default App;
