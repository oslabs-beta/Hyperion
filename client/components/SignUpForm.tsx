import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from './ErrorMessage';
import { registerUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../features/store';
import { CircularProgress } from '@mui/material';
import { validateEmail } from '../utils/inputs';

const SignUpForm = (props: Props) => {

  // component level state 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [helperText, setHelperText] = useState({ name: '', email: '', password: ''})

  // user state 
  const user = useSelector((state: RootState) => state.user );

  // hooks 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // register user handler function 
  const handleRegister = async () => {
    // validation 
    if (password !== confirmPassword) return;
    if (!name) return setErrorMessage('Name is required');
    if (!email) return setErrorMessage('Email address is required');
    if (!password) return setErrorMessage('Password is required');
    
    // calling dispatch with async thunk function 
    const { payload } : any = await dispatch(registerUser({ name: name, password: password, email: email}));
     
    // redirect on success 
    if (payload === 200) {
      alert('Successfully registered. Redirecting to login page');
      return navigate('/login');
    } else { return alert('User creation unsuccessful'); }
  };


  // resets the error message when input is detected on fields 
  useEffect(() => {
    setErrorMessage('');
  }, [name, email, password, confirmPassword])


  useEffect(() => {
    if (email === '') return; 
    if (validateEmail(email) === false) { setHelperText({ ...helperText, email: 'Not a valid email'})}
    else setHelperText({ ...helperText, email: ''})
  }, [email])


  return (
    <div className='login-signup-area'>
      <form action="" className='login-signup-box'>
        <h3 className='login-signup-header'>Register</h3>
        <label htmlFor="name" className='login-signup-label'>
          <TextField onChange={(e) => { setName(e.target.value) }} label="Name"/>
        </label>
        <label htmlFor="email" className='login-signup-label'>
          <TextField helperText={helperText.email} type='email' onChange={(e) => { setEmail(e.target.value) }} label="Email"/>
        </label>
        <label htmlFor="password" className='login-signup-label'>
          <TextField 
            name='password'
            type='password' 
            onChange={(e) => { setPassword(e.target.value) }} 
            label="Password"
          />
        </label>
        <label htmlFor="confirm-password" className='login-signup-label'>
          <TextField name='confirm-password' type='password' onChange={e => { setConfirmPassword(e.target.value) }} label="Confirm Password"/>
        </label>
        { errorMessage !== '' &&
          <ErrorMessage message={errorMessage} />  
        }
        { password !== confirmPassword && 
          <ErrorMessage message="Passwords don't match" />
        }
        <ButtonGroup>
          <Button 
            variant='outlined' 
            size='small' 
            color= 'secondary' 
            onClick={() => { navigate('/login') }}
          >
            CANCEL
          </Button>
          <Button variant='outlined' size='small' color= 'secondary' onClick={handleRegister}>SIGN UP</Button>
        </ButtonGroup>
        { user.registration.status === 'loading' && <CircularProgress /> }
      </form>
    </div>
  )
}


interface Props {}

const ButtonGroup = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding:10px ;
`;


export default SignUpForm