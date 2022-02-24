import React from 'react'
import { FormControl, InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import styled from 'styled-components';

const TestConfigWindow = () => {
  return (
    <>
      <StyledContainer>
        <div>Test Configuration Window</div>
        {/* <FormControl>
          <InputLabel htmlFor='host'>Host</InputLabel>
          <Input id='host' name='host' type='text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='port'>Port</InputLabel>
          <Input id='port' name='port' type='number' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='database'>Database</InputLabel>
          <Input id='database' name='database' type='text' />
          <FormHelperText id="database-helper-text">Name of database</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input id='username' name='username' type='text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input id='password' name='password' type='password' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='ssl'>SSL Mode</InputLabel>
          <Input id='ssl' name='ssl' type='text' />
        </FormControl> */}
      </StyledContainer>
    </>

  )
}

const StyledContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  border-left: 1px solid black;
`;


export default TestConfigWindow