import React from 'react'
import BoxPlot from './BoxPlot';
import LatencyChart from './LatencyChart';
import DataTable from './DataTable';
import LineChart from './RunTimeChart';
import { RunTestResponse } from '../../models/api';
import { Query } from '../../models/database';
import styled from 'styled-components';

const ChartGroup = (props: Props) => {
  return (
    <Container>
      <h4>{props.query.label}</h4>
      <div>
        <div>Query:</div>
        <div>{props.query.queryString}</div>
      </div>
      <div>
        <div>Params:</div>
        <div>{JSON.stringify(props.query.params)}</div>
      </div>
      <LineChart data={props.data} />
      {/* <LatencyChart data={props.data}/> */}
      <BoxPlot data={props.data}/>
      <DataTable data={props.data}/>
    </Container>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  background-color: white;
`;

interface Props {
  query: Query, 
  data: RunTestResponse
}

export default ChartGroup