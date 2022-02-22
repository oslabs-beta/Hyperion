import React, { useState } from 'react';
import styled from 'styled-components';

const NewQueryWindow = () => {
return (
<StyledWindow>
      <h4>Enter Query Here</h4> 
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

export default NewQueryWindow