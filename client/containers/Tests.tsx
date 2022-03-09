import React, { useState } from 'react';
import Layout from './Layout';
import TestConfigWindow from '../components/TestConfigWindow';
import { connect, useSelector } from "react-redux";
import { Query, Database } from '../models/database';
import { RootState } from '../features/store';
import { runTest } from '../features/test/testSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import LineChart  from '../components/Charts/RunTimeChart';
import BoxPlot from '../components/Charts/BoxPlot';

const Tests = (props) => { 

  const testState = useSelector((state: RootState) => { return state.test });
  const databases = useSelector((state: RootState) => { return state.data.databases });
  const databaseArr = Object.values(databases);
  const dispatch = useDispatch()

  const [dbId, setDbId] = useState(databaseArr.length === 0 ? undefined : databaseArr[0].id );
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

  const handleRunTest = () => {
    // validate that there was no mixup with database id and query id 
    // if (!databases[dbId][queryId]) return null; 
    console.log('this is databases[dbId]', databases[dbId])
    console.log('in the run test handler')
    // TODO validate that queryId and dbId exist first 

    dispatch(runTest({ dbId: dbId, queryId: queryId }));
  }

  return (
    <Layout>
      <div className='content-box'>
        <nav className='card-header'>
            <h4>Run Tests</h4>
        </nav>
      </div>
      <div className='content-box'>
        <nav className='card-header'>
            <div>
              <h4>Test Results</h4>
              { testState.status === 'loading' && <CircularProgress /> }
            </div>
            <div>
              <AiOutlinePlusCircle  onClick={() => { setModalVisible(!modalVisible) }}/>
            </div>
        </nav>
        {/* put test results here  */}
      </div>
      { modalVisible === true && 
        <TestConfigWindow 
          runTestHandler={handleRunTest} 
          changeDbHandler={handleDbChange}
          changeQueryHandler={handleQueryChange}
          dbId={dbId}
          queryId={queryId}
          databases={databases}
          toggleWindowFunc={()=> { setModalVisible(!modalVisible) }}
        />
      }
      { testState.results.map((result, i) => { return <LineChart key={i} data={result} />})}
      <BoxPlot></BoxPlot>
    </Layout>
  )
}
 

export default Tests;