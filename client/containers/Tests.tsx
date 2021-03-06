import React, { useState } from 'react';
import Layout from './Layout';
import TestConfigWindow from '../components/TestConfigWindow';
import { useSelector } from "react-redux";
import { Query, Database } from '../models/database';
import { RootState } from '../features/store';
import { runTest } from '../features/test/testSlice';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import LineChart  from '../components/Charts/RunTimeChart';
import BoxPlot from '../components/Charts/BoxPlot';
import LatencyChart from '../components/Charts/LatencyChart';
import DataTable from '../components/Charts/DataTable';
import ChartGroup from '../components/Charts/ChartGroup';

const Tests = (props) => { 

  // hooks 
  const dispatch = useDispatch()

  // slice state 
  const testState = useSelector((state: RootState) => { return state.test });
  const databases = useSelector((state: RootState) => { return state.data.databases });
  const databaseArr = Object.values(databases);
    
  // component level state 
  const [dbId, setDbId] = useState(databaseArr.length === 0 ? undefined : databaseArr[0].id );
  const [queryId, setQueryId] = useState(undefined);
  const [modalVisible, setModalVisible] = useState(false);

  // creates an array of ChartGroup elements based on the results stored in redux store 
  const generateChartsArray = () => {
    const output = [];
    if (!dbId) return;
    for (const [queryId, data] of Object.entries(testState.results)) {
      const databaseId = data.databaseId; 
      const chartGroup = <ChartGroup key={queryId} query={databases[databaseId].queries[queryId]} data={data.data} />
      output.push(chartGroup);
    }
    return output; 
  }

  // handles the database select dropdown box changes to update state 
  const handleDbChange = (e) => {
    if (e.target.value) setDbId(Number(e.target.value));
  }

  // handles the query select dropdown box changes to update state 
  const handleQueryChange = (e) => {
    if (e.target.value) { setQueryId(Number(e.target.value)); }
  }

  // handles running the test 
  const handleRunTest = () => {
    if (!dbId || !queryId) return; 
    
    console.log('in handle run test')
    
    dispatch(runTest({ query: databases[dbId].queries[queryId], dbId: dbId, queryId: queryId }));
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
      {/* generates the charts and returns the components  */}
      { generateChartsArray() }
    </Layout>
  )
}
 

export default Tests;