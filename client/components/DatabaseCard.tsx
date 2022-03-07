import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';

// component 
const DatabaseCard = (props: Props) => {
  const {
    id, 
    isConnected,
    deleteDbFunc,
    label,
    database, 
    port, 
    ssl,
    latency
  } = props;

  return (
    <div className='database-card'>
      <div className='info-group'>
        <div className='info-group-item'>
          <h5>Label:</h5>
          {label}
        </div>
        <div className='info-group-item'>
          <h5>Database:</h5>
          {database}
        </div>
        <div className='info-group-item'>
          <h5>Port:</h5>
          {port}
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
        { isConnected &&  <Button variant='text' size='small' disabled color='success'>Connected</Button> }
        <Button onClick={() => {deleteDbFunc(id)}} variant='outlined' size='small' color='error'>Remove</Button>
      </div>
    </div>
  )
}

interface Props {
  id: number, 
  deleteDbFunc: Function,
  label: string,
  isConnected?: boolean,
  database: string,
  port: number,
  user?: string, 
  ssl?: string, 
  latency: number
}


export default DatabaseCard