import React from 'react'
import { Query } from '../models/database';
import { Database } from '../models/database';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
        
const TestConfigWindow = (props: Props) => {

  const {
    runTestHandler,
    changeDbHandler, 
    changeQueryHandler,
    dbId, 
    queryId,
    databases
  } = props;

  return (
    <StyledContainer className='modal-container'>
      <div>Test Configuration Window</div>
      <h3>Select Database</h3>
      <select value={dbId} onChange={() => { changeDbHandler() }}>
        { Object.values(databases).map((db : Database, i) => {
          return (
            <option label={db.label} key={i} value={db.id}>
              {db.label}
            </option>
          )
        })}
      </select>
      <h3>Select Query</h3>
      <select value={queryId} onChange={() => { changeQueryHandler() }}>
        { dbId !== undefined && Object.values(databases[dbId].queries).map((query : Query, i) => {
          return (
            <option key={i} value={query.id}>
              {query.label}
            </option>
          )
        })}
      </select>
      <Button 
        type='submit' 
        onClick={() => { runTestHandler()}} 
        size='small' 
        variant='contained'
      >
        Run Test
      </Button>
    </StyledContainer>
  )
}

interface Props {
  runTestHandler: Function;
  changeDbHandler: Function;
  changeQueryHandler: Function;
  dbId: number;
  queryId: number;
  databases: {[id: number]: Database};
}


const StyledContainer = styled.div`
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  border-left: 1px solid black;
`;


export default TestConfigWindow