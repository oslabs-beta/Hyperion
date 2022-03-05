import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import TestConfigWindow from '../components/TestConfigWindow';
import { connect, useSelector } from "react-redux";
import LineGraph from '../components/LineGraph';
import Database from '../models/database';
import { Query } from '../models/database';
import { RootState } from '../features/store';
import { runTest } from '../features/test/testSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
const Tests = (props) => { 

  const databases = useSelector((state: RootState) => { return state.data.databases });
  const [dbId, setDbId] = useState(Object.values(databases).length === 0 ? undefined : databases[0].id );
  const [queryId, setQueryId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDbChange = (e) => {
    console.log(e.target.value, 'in handleDbChange')
    if (e.target.value) setDbId(e.target.value);
  }

  const handleQueryChange = (e) => {
    if (e.target.value) {
      setQueryId(e.target.value);
    }
  }

  const runTest = () => {
    // validate that there was no mixup with database id and query id 
    if (!databases[dbId][queryId]) return null; 
    runTest();
  }

  return (
    <Layout>
      <div className='content-box'>
        <nav className='card-header'>
            <h3>Run Tests</h3>
        </nav>
      </div>
      <div className='content-box'>
        <nav className='card-header'>
            <h4>Test Results</h4>
            <div>
              <AiOutlinePlusCircle  onClick={() => { setModalVisible(!modalVisible) }}/>
            </div>
        </nav>
        {/* put test results here  */}
      </div>
      { modalVisible === true && 
        <TestConfigWindow 
          runTestHandler={runTest} 
          changeDbHandler={handleDbChange}
          changeQueryHandler={handleQueryChange}
          dbId={dbId}
          queryId={queryId}
          databases={databases}
        />
      }
    </Layout>
  )
}
 

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%; 
  justify-content: right;
`;


export default Tests;