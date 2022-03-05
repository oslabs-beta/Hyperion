import React, { isValidElement, useState } from 'react';
import styled from 'styled-components';
import { FormControl, TextField, InputLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';

const NewQueryWindow = ({ newQueryFunc }) => {

  const handleSubmit = (e) => {
    
    e.preventDefault();

    const query = e.target.input.value; 
    e.target.input.value = '';
    
    const isValidInput = validateInput(query);

    if (!isValidInput) return;
    // TODO clean the input fields 
    if (isValidInput) {
      newQueryFunc(query);
    }
  
  }
 
  // TODO validate the query input
  // ensure 
  const validateInput = (input) => {
    if (!input) return false;
    return true; 
  }


  return (
    <div className='modal-container'>
      <h4>Add Query</h4> 
      <form onSubmit={handleSubmit} className='new-query-form'>
        <FormControl>
          <InputLabel htmlFor='label'>Label</InputLabel>
              <Input id='label' name='label' type='text' />
        </FormControl>
        <FormControl>
          <TextField multiline rows={12} type='text' id='input-field' maxRows={12} name='input' />
        </FormControl>
        <Button type='submit' size='small' variant='contained'>Submit</Button>
      </form>
    </div>
  )
}


export default NewQueryWindow