import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { FormControl, InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';

const NewDatabaseWindow = ({ addDbFunc, ...rest}) => {

  const [isConnectingByUri, setIsConnectingByUri] = useState(true); 
  const [isValidInput, setIsValidInput] = useState(true);

  // validates new database input before adding database
  const handleSubmit = (e) => {
    // prevents automatic reload on submit 
    e.preventDefault();

    let formData = {}
    if (isConnectingByUri) {
      formData = {
        isConnectingByUri: isConnectingByUri, 
        uri: e.target.uri.value
      }
    }
    else formData = {
      isConnectingByUri: isConnectingByUri,
      host: e.target.host.value,
      port: e.target.port.value,
      database: e.target.database.value,
      username: e.target.username.value, 
      password: e.target.password.value, 
      ssl: e.target.ssl.value
    }

    const isValidated = validate(formData);
    if (isValidated === true) {
      return addDbFunc(formData);
    } else {
      setIsValidInput(false);
      setTimeout(()=>{
        setIsValidInput(true);
      }, 3000)
      return;
    }
  }

  const validate = (formData) => {
    if (formData.isConnectingByUri && uri) return true; 
    if (!host || !port || !database || !username || !password || !ssl) return false; 
    if (typeof port !== 'number') return false; 
    return true; 
  }

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
      <form onSubmit={handleSubmit} className='new-db-form'>
        { isConnectingByUri ? 
          <>
            <FormControl>
              <InputLabel htmlFor='uri'>URI</InputLabel>
              <Input id='uri' name='uri' type='text' />
            </FormControl>
          </>
          : 
          <>
            <FormControl>
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
            </FormControl>
          </>
        }
        <Button type='submit' size='small' variant='contained'>Add</Button>
      </form>
      {isValidInput ? null : <ErrorMessage>Missing database detail(s)</ErrorMessage>}
    </StyledWindow>
  )
}

const StyledWindow = styled.div`
  width: max(30%, 400px);
  padding: .5em 1em; 
  display: flex;
  flex-direction: column; 
  row-gap: 1.5em;
  overflow-y: scroll;
  .new-db-form {
    display: flex; 
    flex-direction: column;
    row-gap: 1em;
  }
`;


const ErrorMessage = styled.div`
  color: red;
`;

export default NewDatabaseWindow