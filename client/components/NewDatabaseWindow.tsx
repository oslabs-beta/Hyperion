import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { FormControl, InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { NewDatabaseForm } from '../models/database';


const NewDatabaseWindow = ({ addDbFunc, ...rest}) => {
  
  const [isConnectingByUri, setIsConnectingByUri] = useState(true); 
  const [inputError, setInputError] = useState({ error: ''})
 
  // invoked when new database form is submitted 
  // validates input with error message 
  // calls the addDbFunc in props to update state and fetch to server
  const handleSubmit = (e) => {
    // prevents automatic reload on submit 
    e.preventDefault();
    
    const form : NewDatabaseForm = {
      isConnectingByUri: isConnectingByUri,
      label: e.target.label.value,
    };

    if (isConnectingByUri) { form.uri = e.target.uri.value }
    else {
      form.host = e.target.host.value,
      form.port = e.target.port.value,
      form.database = e.target.database.value,
      form.username = e.target.username.value, 
      form.password = e.target.password.value, 
      form.ssl = e.target.ssl.value
    };

    const isValidForm = validate(form);
    if (!isValidForm) {
      displayError('Missing database detail(s)');
      return; 
    };
    if (isValidForm === true) {
      clearInputFields();
      return addDbFunc(form);
    };
  }

  // displays the message error at the bottom of the window for time ms
  const displayError = (message: string, time : number = 3000) => {
    const formattedMessage = message.charAt(0).toUpperCase() + message.slice(1);
    setInputError({ error: formattedMessage })
    setTimeout(() => {
      setInputError({ error: '' });
    }, time)
  }

  // validates the user input form 
  const validate = (form : NewDatabaseForm): boolean => {
    // if database is connecting by uri
    if (form.isConnectingByUri && form.uri && form.label) return true; 
    // if database is connected by settings
    else {
      if (!form.host || !form.port || !form.database || !form.username || !form.password || !form.ssl || !form.label) return false; 
      if (typeof form.port !== 'number') return false; 
    }
    return true; 
  }
 
  // clears all values from input fields 
  const clearInputFields = () => {
    return;
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
        onChange ={() => { setIsConnectingByUri(!isConnectingByUri); }}
      />
      {/* ------------- form ------------------- */}
      <form onSubmit={handleSubmit} className='new-db-form'>
        <FormControl>
          <InputLabel htmlFor='label'>Label</InputLabel>
              <Input id='label' name='label' type='text' />
        </FormControl>
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
      {inputError.error === '' ? null : <ErrorMessage>{inputError.error}</ErrorMessage>}
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