import React from 'react';
import styled from 'styled-components';
import { TextField, Button, Dialog, DialogActions  } from '@mui/material';

const SignUpForm = () => {

    return (
        <SignUpArea> 
            <SignUpBox>
            <Label>
            <TextField label="First Name"/>
            </Label>
            <Label>
            <TextField label="Last Name"/>
            </Label>
            <Label>
            <TextField label="Email"/>
            </Label>
            <Label>
            <TextField label="Username"/>
            </Label>
            <Label>
            <TextField label="Password"/>
            </Label>
            <ButtonGroup>
            <Button  variant='outlined' size='small' color= 'secondary' >CANCEL</Button>
            <Button  variant='outlined' size='small' color= 'secondary' >SIGN UP</Button>
            </ButtonGroup>
            </SignUpBox>
        </SignUpArea>
    )
}

//Style Components Here 

const SignUpArea = styled.body`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const SignUpBox = styled.form`
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

const ButtonGroup = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding:10px ;
`;


export default SignUpForm