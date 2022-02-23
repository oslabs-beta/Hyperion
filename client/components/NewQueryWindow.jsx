import React, { useState } from 'react';
import styled from 'styled-components';
import { FormControl, TextField } from '@mui/material';
import Button from '@mui/material/Button';

const NewQueryWindow = () => {
return (
<StyledWindow>
      <h4>Add Query</h4> 
      <form className='new-query-form'>
    <FormControl>
      <TextField multiline rows={12} maxRows={12} />
      </FormControl>
      <Button type='submit' size='small' variant='contained'>Submit</Button>
      </form>
</StyledWindow>
)
}

const StyledWindow = styled.div`
  width: max(30%, 400px);
  padding: .5em 1em; 
  display: flex;
  flex-direction: column; 
  row-gap: 1.5em;
  .new-query-form {
    display: flex; 
    flex-direction: column;
    row-gap: 1em;
  }
`;

export default NewQueryWindow