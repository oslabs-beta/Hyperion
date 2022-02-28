import React from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import SignUpForm from '../components/SignUpForm';

// State management 

// Login Component
const Login = () => {
  //Need validation here to see if user has entered valid login credentials 
  // If user enters valid login credentials need to navigate to home page? 
  const [open, setOpen] = React.useState(false);
  //function to handle modal open 
  const handleClickOpen = () => { setOpen(true); };

  const handleClose = () => { setOpen(false); };

  return (
    <div className='login-area'>
      <form className='login-box'>
        <h3 className='login-header'>Login</h3>
        <label className='login-label'>
          <TextField required id="outlined-required" label="Username"/>
        </label>
        <label className='login-label'>
          <TextField id="outlined-password-input" label="Password" type="Password"/>
        </label>
        <Button  variant='outlined' size='small' color= 'secondary'>LOG IN</Button>
      </form>
      <form className='signup-box'>
        <h3 className='login-header'>Don't have an account?</h3>
        <Button onClick={handleClickOpen}  variant='outlined' size='small' color= 'secondary' >SIGN UP</Button>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <SignUpForm handleCloseFunc={() => {setOpen(!open)}}></SignUpForm>
        </Dialog>
      </form>
    </div>
    )

    // // Sankari Version 
    // <LoginArea>
    //   <LoginBox>
    //     <H3>Login</H3>
    //     <Label>
    //     <TextField required id="outlined-required" label="Username"/>
    //     </Label>
    //     <Label>
    //       <TextField id="outlined-password-input" label="Password" type="Password"/>
    //     </Label>
    //     <Button  variant='outlined' size='small' color= 'secondary'>LOG IN</Button>
    //   </LoginBox>
    //   <LoginBox>
    //     <H3> Don't have an account?  </H3>
    //     <Button onClick={handleClickOpen}  variant='outlined' size='small' color= 'secondary' >SIGN UP</Button>
    //     <Dialog fullScreen open={open} onClose={handleClose}>
    //       <SignUpForm handleCloseFunc={() => {setOpen(!open)}}></SignUpForm>
    //     </Dialog>
    //   </LoginBox>
    // </LoginArea>
  // )
 
}



// //Style Components Here 

// const LoginArea = styled.body`
// display: flex;
// justify-content: center;
// align-items: center;
// flex-direction: column;
// `;

// const LoginBox = styled.form`
//   display: flex;
//   justify-content: space-around;
//   flex-direction: column;
//   margin:50px 50px 0;
//   width: 25%;
//   border: 1px solid rgba(24, 63, 161, 0.3);
//   border-radius: 5px;
//   padding: 15px;
// `;


// const Label = styled.label`
//   display: flex;
//   flex-direction: column;
//   padding:10px ;
// `;

// const H3 = styled.h3`
//   font-family: 'Notable', sans-serif;
//   font-size: 15px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;


export default Login
