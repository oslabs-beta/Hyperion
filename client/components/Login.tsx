import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SignUpForm from './SignUpForm';
import ErrorMessage from './ErrorMessage';
import {useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../features/store';


// Login Component
const Login = (props) => {
  //Need validation here to see if user has entered valid login credentials 
  // If user enters valid login credentials need to navigate to home page? 


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated === true) { navigate('/dashboard') };

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = () => {
    if (password === '') { return setErrorMessage('Password field was left empty') };
    if (username === '') { return setErrorMessage('Username field was left empty') };
    // dispatch(loginUser(username, password));
  }

  const handleToggle = () => { setOpen(!open) };

  return (
    <LoginArea>
      <LoginBox>
          <H3>Login</H3>
          <Label>
            <TextField onChange={(e)=>{ setUsername(e.target.value)} } required id="outlined-required" label="Username"/>
          </Label>
          <Label>
          <TextField onChange={e => setPassword(e.target.value) } id="outlined-password-input" label="Password" type="Password"/>
          </Label>
          <Button variant='outlined' size='small' color= 'secondary'>LOG IN</Button>
          { errorMessage &&  
            <ErrorMessage message={errorMessage} />
          }
      </LoginBox>
      <LoginBox>
        <H3> Don't have an account?  </H3>
        <Button onClick={handleToggle}  variant='outlined' size='small' color= 'secondary' >SIGN UP</Button>
          <Dialog fullScreen open={open} onClose={handleToggle}>
            <SignUpForm handleCloseFunc={handleToggle}></SignUpForm>
          </Dialog>
      </LoginBox>
    </LoginArea>
  )
}





//Style Components Here 
const LoginArea = styled.body`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const LoginBox = styled.form`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin:50px 50px 0;
  width: 25%;
  border: 1px solid rgba(24, 63, 161, 0.3);
  border-radius: 5px;
  padding: 15px;
`;


const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding:10px ;
`;

const H3 = styled.h3`
  font-family: 'Notable', sans-serif;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


export default Login;