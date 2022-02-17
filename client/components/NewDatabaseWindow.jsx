import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { FormControl, InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';

const NewDatabaseWindow = (props) => {
  // might need to bring this state up
  const [isConnectingByUri, setIsConnectingByUri] = useState(true); 

  return (
    <StyledWindow>
      <h4>Add New Database</h4>
      { isConnectingByUri ? 
        <label>Connecting by URI</label>
        : 
        <label>Connecting manually</label>
      }
      <Switch 
        checked={isConnectingByUri}
        onChange ={() => { 
          isConnectingByUri === true ? setIsConnectingByUri(false) : setIsConnectingByUri(true) 
        }}
      />
      {/* Need to add a database reference name input  */}
      { isConnectingByUri ? 
        <form className='new-db-form'>
          <FormControl>
            <InputLabel htmlFor='uri'>URI</InputLabel>
            <Input id='uri' type='text' />
          </FormControl>
        </form>
        : 
        <form className='new-db-form'>
          <FormControl>
            <InputLabel htmlFor='host'>Host</InputLabel>
            <Input id='host' type='text' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='port'>Port</InputLabel>
            <Input id='port' type='number' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='database'>Database</InputLabel>
            <Input id='database' type='text' />
            <FormHelperText id="my-helper-text">Name of database</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='username'>Username</InputLabel>
            <Input id='username' type='text' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <Input id='password' type='password' />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='ssl'>SSL Mode</InputLabel>
            <Input id='ssl' type='text' />
          </FormControl>
        </form>
      }
      <Button size='small' variant='contained'>Submit</Button>
    </StyledWindow>
    
  )
}

const StyledWindow = styled.div`
  width: max(30%, 400px);
  padding: .5em 1em; 
  display: flex;
  flex-direction: column; 
  row-gap: 1.5em;
  .new-db-form {
    display: flex; 
    flex-direction: column;
    row-gap: 1em;
  }
`;

export default NewDatabaseWindow