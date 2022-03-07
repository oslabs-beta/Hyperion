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
import Chart from '../components/PlotlyGraph'

const Tests = (props) => { 

 
  const databases = useSelector((state: RootState) => { return state.data.databases });
  const [dbId, setDbId] = useState(Object.values(databases).length === 0 ? undefined : databases[0].id );
  const [queryId, setQueryId] = useState(undefined);

  const handleDbChange = (e) => {
    console.log(e.target.value, 'in handleDbChange')
    if (e.target.value) setDbId(e.target.value);
  }

  const handleQueryChange = (e) => {
    console.log('in handlequerychange', e.target.value)
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
      <h4>Tests</h4>
      <StyledContainer>
        <select value={dbId} onChange={handleDbChange}>
          { Object.values(databases).map((db : Database, i) => {
            return (
              <option label={db.label} key={i} value={db.id}>
                {db.label}
              </option>
            )
          })}
        </select>
        <select value={queryId} onChange={handleQueryChange}>
          { dbId !== undefined && Object.values(databases[dbId].queries).map((query : Query, i) => {
            return (
              <option key={i} value={query.id}>
                {query.queryString}
              </option>
            )
          })}
        </select>

        {/* <LineGraph /> */}
        <TestConfigWindow runTestHandler={runTest} />
        <Chart></Chart>
      </StyledContainer>
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