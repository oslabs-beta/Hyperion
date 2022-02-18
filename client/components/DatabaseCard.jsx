import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';

const DatabaseCard = (props) => {
  const {
    id, 
    deleteDbFunc,
    connectDbFunc,
    isConnected,
    database, 
    port, 
    user, 
    ssl,
    latency
  } = props;

  return (
    <StyledCard>
      <div className='info-group'>
        <div className='info-group-item'>
          <h5>Database:</h5>
          {database}
        </div>
        <div className='info-group-item'>
          <h5>Port:</h5>
          {port}
        </div>
        <div className='info-group-item'>
          <h5>User:</h5>
          {user}
        </div>
        <div className='info-group-item'>
          <h5>SSL:</h5>
          {ssl}
        </div>
        <div className='info-group-item'>
          <h5>Latency:</h5>
          {latency}
        </div>
      </div>
      <div className='button-group'>
        {isConnected ? 
          <Button variant='text' size='small' disabled color='success'>Connected</Button>
          :
          <Button onClick={() => {connectDbFunc(id)}} variant='contained' size='small' color='success'>Connect</Button>
        }
        <Button onClick={() => {deleteDbFunc(id)}} variant='outlined' size='small' color='error'>Delete</Button>
      </div>


    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex; 
  flex-direction: column; 
  border: 1.5px solid black;
  row-gap: 10px;
  margin-bottom: 1em;
  padding: 1em 2em;
  border-radius: 10px;
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
    justify-content: flex-end; 
    column-gap: 5px;
  }
`;



// DatabaseCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   connectDbFunc: PropTypes.func.isRequired,
//   deleteDbFunc: PropTypes.func.isRequired,
//   database: PropTypes.string.isRequired,
//   port: PropTypes.number.isRequired, 
//   user: PropTypes.string.isRequired, 
//   ssl: PropTypes.string,
//   latency: PropTypes.number,
// }


export default DatabaseCard