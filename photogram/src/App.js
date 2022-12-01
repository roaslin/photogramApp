import { React, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import { CssBaseline } from '@mui/material';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [token]);

  if (!token) {
    return (
      <div className='login_form'>
        <CssBaseline />
        <Login onChangeToken={setToken} />
      </div>
    );
  }

  navigate('/home');

  return <div></div>;
}

export default App;
