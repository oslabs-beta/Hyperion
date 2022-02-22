import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';


const QueryCard = (props) => {
    const {
      id, 
      deleteQueryFunc,
      sqlQuery
    } = props;


return (
    <StyledCard>
    <div className='info-group'>
    <div className='info-group-item'>
          <h5>SQL Query:</h5>
          {sqlQuery}
        </div>
    </div>
    <div className='button-group'>
    <Button onClick={() => {deleteQueryFunc(id)}} variant='outlined' size='small' color='error'>Delete</Button>
    </div>  
    </StyledCard>
)
}

const StyledCard = styled.div`
display: flex; 
flex-direction: column; 
border: 1.5px solid black;
row-gap: 10px;
margin-top: 100px;
margin-bottom: 100px;
margin-right: 150px;
margin-left: 80px;
padding: 10em 5em;
border-radius: 40px;
background-color: rgb(250, 250, 250);

.info-group {
    display: flex; 
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .info-group-item {
    display: flex; 
    flex-direction: column; 
  }
  .info-group-item > h5 {
    margin: 0px;
  }

.button-group {
  display: flex; 
  justify-content: right; 
  column-gap: 5px;
}
`;

  export default QueryCard