import React, { isValidElement, useState } from 'react';
import styled from 'styled-components';
import { FormControl, TextField, InputLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';
import { formatInputString } from '../utils/inputs';
import { AiOutlineClose } from 'react-icons/ai';


const NewQueryWindow = ({ newQueryFunc, toggleCloseFunc }) => {

  // component level state 
  const [query, setQuery] = useState('');
  const [label, setLabel] = useState('');
  const [queryParams, setQueryParams] = useState('');

  const handleSubmit = (e) => {
    // prevents automatic reload of page
    e.preventDefault();

    const isValidInput = validateInput(query, label);
    
    if (!isValidInput) return;
    // TODO clean the input fields 

    // clear input fields 
    e.target.input.value = '';
    e.target.label.value = '';
    e.target.params.value = '';
    
    if (isValidInput) {
      newQueryFunc(formatInputString(query), formatInputString(label), formatInputString(queryParams));
    }
  
  }
 
  // TODO validate the query input
  // ensure 
  const validateInput = (query, label) => {
    if (!query || !label) return false;
    return true; 
  }


  return (
    <div className='modal-container'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4>Add Query</h4> 
        <AiOutlineClose onClick={toggleCloseFunc} />
      </div>
      <StyledForm onSubmit={handleSubmit} className='new-query-form'>
        <FormControl>
          <InputLabel htmlFor='label'>Label</InputLabel>
              <Input 
                onChange={(e) => setLabel(e.target.value)}
                id='label'
                name='label'
                type='text'
              />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='input'>Query</InputLabel>
          <TextField 
            onChange={(e) => setQuery(e.target.value)} 
            multiline 
            rows={10} 
            type='text' 
            id='input-field'
            // maxRows={12} 
            name='input' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='params'>Parameters</InputLabel>
          <TextField 
            onChange={(e) => setQueryParams(e.target.value)} 
            multiline 
            rows={10} 
            type='text' 
            id='params-input'
            // maxRows={12} 
            name='params' />
        </FormControl>
        <Button type='submit' size='small' variant='contained'>Submit</Button>
      </StyledForm>
    </div>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;


export default NewQueryWindow