import React, { isValidElement, useState } from 'react';
import styled from 'styled-components';
import { FormControl, TextField, InputLabel, Input } from '@mui/material';
import Button from '@mui/material/Button';
import { formatInputString } from '../utils/inputs';
import { AiOutlineClose } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';


const NewQueryWindow = ({ newQueryFunc, toggleCloseFunc, paramArray, addParamField, removeParamField, handleChange }) => {

  // component level state 
  const [query, setQuery] = useState('');
  const [label, setLabel] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    // prevents automatic reload of page
    e.preventDefault();

    const isValidInput = validateInput(query, label);
    
    if (!isValidInput) return;
    // TODO clean the input fields 

    // clear input fields 
    e.target.input.value = '';
    e.target.label.value = '';
    
    if (isValidInput) {
      newQueryFunc(formatInputString(query), formatInputString(label));
    }
  }


  // TODO validate the query input
  const validateInput = (query: string, label: string) : boolean => {
    if (!query || !label) {
      return false;
    }
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
            helperText={`example query: SELECT * FROM users WHERE firstname=$1 AND lastname=$2` }
            onChange={(e) => setQuery(e.target.value)} 
            multiline 
            rows={10} 
            type='text' 
            id='input-field'
            name='input' />
        </FormControl>
        <div style={{display: 'flex', flexDirection: 'column', rowGap: '10px', marginTop: '10px'}}>
          {
            paramArray.map((paramField, i) => {
              return (
                <FormControl key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', alignItems: 'center' }}>
                    <InputLabel htmlFor='label'>{`$${i+1} placeholder values`}</InputLabel>
                      <Input 
                        onChange={(e) => handleChange(i, e.target.value)}
                        id='label'
                        name={`#${i+1} placeholder`}
                        type='text'
                        value={paramField}
                      />
                      <FiTrash onClick={() => { removeParamField(i) }} />
                  </div>
                </FormControl>
              )
            })
          }
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div>Add Parameter Field</div>
          <MdAdd onClick={addParamField} />
        </div>
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