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
      <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', padding: '2em'}}>
        <HeaderItem>
          <h4>Label:</h4>
          <div>{props.query.label}</div>
        </HeaderItem>

        <HeaderItem>
          <h4>Query:</h4>
          <div>{props.query.queryString}</div>
        </HeaderItem>

        <HeaderItem>
          <h4>Params:</h4>
          <div>{JSON.stringify(props.query.params)}</div>
        </HeaderItem>
      </div>
      <HorizontalLine />
      
      <LineChart data={props.data} />
      {/* <LatencyChart data={props.data}/> */}
      <BoxPlot data={props.data}/>
      <DataTable data={props.data}/>
    </Container>
  )
}

const HeaderItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HorizontalLine = styled.div`
  border-bottom: 1px solid grey;
  align-self: center;
  width: 75%
`;

const Container = styled.div`
  display: flex; 
  flex-direction: column;
  background-color: white;
  // align-items: center;
  justify-content: space-around; 
`;

interface Props {
  query: Query, 
  data: RunTestResponse
}

export default ChartGroup