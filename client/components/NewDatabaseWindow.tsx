import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import { FormControl, InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { NewDatabaseRequestBody } from '../models/api';
import { AiOutlineClose } from 'react-icons/ai';

const NewDatabaseWindow = ({ addDbFunc, toggleWindowFunc, ...rest}) => {
  
  const [isConnectingByUri, setIsConnectingByUri] = useState(true); 
  const [inputError, setInputError] = useState({ error: ''})

  const [label, setLabel] = useState('');
  const [uri, setUri] = useState('');
  const [host, setHost] = useState('');
  const [port, setPort] = useState(undefined);
  const [database, setDatabase] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sslMode, setSslMode] = useState('');



 
  // invoked when new database form is submitted 
  // validates input with error message 
  // calls the addDbFunc in props to update state and fetch to server
  const handleSubmit = (e) => {
    // prevents automatic reload on submit 
    e.preventDefault();
    let form: NewDatabaseRequestBody; 
    if (isConnectingByUri === true) {
      form = {
        dbInfo: {
          dbname: label,
          connectionString: uri,
          connectionType: 'URI',
          connectionParams: {
            host: null, 
            port: null, 
            database: null, 
            username: null, 
            password: null,
            sslMode: null 
          }
        },
      }
    } else {
      form = {
        dbInfo: {
          dbname: label,
          connectionType: 'CONNECTION_PARAMS',
          connectionString: null, 
          connectionParams: {
            host: host, 
            port: port, 
            database: database, 
            username: username, 
            password: password, 
            sslMode: sslMode
          }
        }
      }
    }

    if (validate(form) === true) {
      clearInputFields();
      return addDbFunc(form);
    } else return displayError('Missing database detail(s)'); 
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
  const validate = (form : NewDatabaseRequestBody): boolean => {
    const dbInfo = form.dbInfo;
    // if database is connecting by uri
    if (dbInfo.connectionType === 'URI' && dbInfo.dbname && dbInfo.connectionString) return true; 
    // if database is connected by settings
    else {
      if (
        !dbInfo.connectionParams.host ||
        !dbInfo.connectionParams.port || 
        !dbInfo.connectionParams.database || 
        !dbInfo.connectionParams.username ||
        !dbInfo.connectionParams.password ||
        !dbInfo.connectionParams.sslMode  
      ) return false;
      if (typeof dbInfo.connectionParams.port !== 'number' || dbInfo.connectionParams.port < 0) return false; 
    }
    return true; 
  }
 
  // clears all values from input fields 
  const clearInputFields = () => {
    return;
  }

  return (
    <StyledWindow className='modal-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <h4>Add New Database</h4>
        <AiOutlineClose onClick={toggleWindowFunc} />
      </div>

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
              <Input onChange={(e) => {setLabel(e.target.value)}} id='label' name='label' type='text' />
        </FormControl>
        { isConnectingByUri ? 
          <>
            <FormControl>
              <InputLabel htmlFor='uri'>URI</InputLabel>
                <Input onChange={(e) => {setUri(e.target.value)}} id='uri' name='uri' type='text' />
            </FormControl>
          </>
          : 
          <>
            <FormControl>
              <InputLabel htmlFor='host'>Host</InputLabel>
                <Input id='host' onChange={(e) => setHost(e.target.value)} name='host' type='text' />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='port'>Port</InputLabel>
                <Input onChange={(e) => setPort(e.target.value)} id='port' name='port' type='number' />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='database'>Database</InputLabel>
                <Input onChange={(e) => setDatabase(e.target.value)} id='database' name='database' type='text' />
              <FormHelperText id="database-helper-text">Name of database</FormHelperText>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='username'>Username</InputLabel>
                <Input onChange={(e) => setUsername(e.target.value)} id='username' name='username' type='text' />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='password'>Password</InputLabel>
                <Input onChange={(e) => setPassword(e.target.value)} id='password' name='password' type='password' />
            </FormControl>
            {/* <FormControl>
              <InputLabel htmlFor='ssl'>SSL Mode</InputLabel>
                <Input id='ssl' name='ssl' type='text' />
            </FormControl> */}
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