import React from 'react';
import styled from 'styled-components';
import { FormControl, TextField, Button } from '@mui/material';

// State management 


const Login = () => {
    return (
    <LoginBox>
        <Label>
        <TextField
          required id="outlined-required" label="Required"defaultValue="Username "
        />
        </Label>
        <Label>
         <TextField
          required id="outlined-required" label="Required"defaultValue="Password "
        />
        </Label>
        <Button  variant='outlined' size='small' color= 'secondary'>LOG IN</Button>
    </LoginBox>
    )
}

//Style Components Here 

const LoginBox = styled.form`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  margin:100px 100px 0;
  width: 25%;
  border-radius: 5px;
  padding: 15px;
  background-color: rgba(237, 220, 242, 0.8);
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding:10px ;
`;
/*
// Username
<input type="text" name="username" />
</Label>
<Label>
 Password
<input type="text" name="password" />
*/ 

export default Login
