import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../features/store';
import { loginUser } from '../features/user/userSlice';


// Login Component
const Login = (props) => {
  //Need validation here to see if user has entered valid login credentials 
  // If user enters valid login credentials need to navigate to home page? 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated === true) { navigate('/dashboard') };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = () => {
    if (password === '') { setErrorMessage('Password field was left empty'); return; };
    if (username === '') { setErrorMessage('Username field was left empty'); return;  };
    // dispatch(loginUser(username, password));
  }

  return (
    <div className='login-signup-area'>
      <form action="" className='login-signup-box'>
        <h3 className='login-signup-header'>Login</h3>
        <label className='login-signup-label' htmlFor="username">
          <TextField onChange={(e)=>{ setUsername(e.target.value)} } required id="outlined-required"  label="username"/>
        </label>
        <label htmlFor="" className='login-signup-label'>
          <TextField onChange={e => setPassword(e.target.value) } required id="outlined-password-input" label="Password" type="Password"/>
        </label>
        { errorMessage !== '' &&  
          <ErrorMessage message={errorMessage} />
        }
        <Button variant='outlined' onClick={handleSubmit} size='small' color= 'secondary'>LOG IN</Button>
      </form>
      <div className='login-signup-box'>
        <h3 className='login-signup-header'>Don't have an acccount?</h3>
        <Button onClick={() => { navigate('/register')} }  variant='outlined' size='small' color= 'secondary' >SIGN UP</Button>
      </div>
    </div>
  )
}


export default Login;