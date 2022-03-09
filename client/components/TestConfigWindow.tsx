import React from 'react'
import { Query } from '../models/database';
import { Database } from '../models/database';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
import { AiOutlineClose } from 'react-icons/ai';       

const TestConfigWindow = (props: Props) => {

  const {
    runTestHandler,
    changeDbHandler, 
    changeQueryHandler,
    toggleWindowFunc, 
    dbId, 
    queryId,
    databases
  } = props;

  return (
    <StyledContainer className='modal-container'>
      <AiOutlineClose style={{ alignSelf: 'flex-end', justifySelf: 'start' }} onClick={toggleWindowFunc} />
      <div style ={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>Test Configuration</div>  
      </div>
      <h3>Select Database</h3>
      <select value={dbId} onChange={(e) => { changeDbHandler(e) }}>
        { Object.values(databases).map((db : Database, i) => {
          return (
            <option label={db.label} key={i} value={db.id}>
              {db.label}
            </option>
          )
        })}
      </select>
      <h3>Select Query</h3>
      <select value={queryId} onChange={(e) => { changeQueryHandler(e)} }>
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
        onClick={() => { runTestHandler() }} 
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
  toggleWindowFunc: any; 
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