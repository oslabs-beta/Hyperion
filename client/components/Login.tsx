import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import ErrorMessage from './ErrorMessage';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../features/store';
import { loginUser } from '../features/user/userSlice';
import { Spinner } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import { formatInputString } from '../utils/inputs';

// Login Component
const Login = (props) => {

  // component level state 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // redux state 
  const user = useSelector((state: RootState) => state.user.auth);

  // hooks 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  // redirection 
  useEffect(() => {
    if (user.isAuthenticated === true) navigate('/dashboard')
  }, [])

  // login handler function 
  const handleLogin = async () => {
    if (password === '') { setErrorMessage('Password field was left empty'); return; };
    if (email === '') { setErrorMessage('Username field was left empty'); return;  };

    const { payload } : any = await dispatch(loginUser({ email: email.trim(), password: password.trim() })); 
    console.log('this is payload in handleLogin', payload)
    if (payload === true) {
      navigate('/dashboard');
    } else return alert('Incorrect login credentials');
  }

  useEffect(() => {
    setErrorMessage('');
  }, [email, password])

  return (
    <div className='login-signup-area'>
      <form action="" className='login-signup-box'>
        <h3 className='login-signup-header'>Login</h3>
        <label className='login-signup-label' htmlFor="email">
          <TextField
            label="Email"
            onChange={(e)=>{ setEmail(e.target.value)} }
            required 
            id="outlined-required" 
          />
        </label>
        <label htmlFor="" className='login-signup-label'>
          <TextField 
            label="Password"
            onChange={e => setPassword(e.target.value) } 
            required id="outlined-password-input" 
            type="Password"
          />
        </label>
        { errorMessage !== '' &&  
          <ErrorMessage message={errorMessage} />
        }
        <Button 
          variant='outlined' 
          onClick={handleLogin} 
          size='small' 
          color= 'secondary'
        >
          LOG IN
        </Button>
        { user.status === 'loading' && <CircularProgress /> }
      </form>
      <div className='login-signup-box'>
        <h3 className='login-signup-header'>Don't have an acccount?</h3>
        <Button 
          onClick={() => { navigate('/register')} } 
          variant='outlined' 
          size='small' 
          color= 'secondary'
        >
          SIGN UP
        </Button>
      </div>
    </div>
  )
}


export default Login;