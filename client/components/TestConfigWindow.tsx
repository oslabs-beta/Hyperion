import React from 'react'
import { FormControl, InputLabel } from '@mui/material';
import { Input } from '@mui/material';
import { FormHelperText } from '@mui/material';
import styled from 'styled-components';
import Button from '@mui/material/Button';
        
const TestConfigWindow = (props) => {
  const {
    runTestHandler
  } = props;
  return (
    <>
      <StyledContainer>
        <div>Test Configuration Window</div>
        <Button type='submit' onClick={() => { runTestHandler()}} size='small' variant='contained'>
          Run Test
        </Button>
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