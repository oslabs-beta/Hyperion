import React from 'react'
import BoxPlot from './BoxPlot';
import LatencyChart from './LatencyChart';
import DataTable from './DataTable';
import { RunTestResponse } from '../../models/api';
import { Query } from '../../models/database';

const ChartGroup = (props: Props) => {
  return (
    <div>ChartGroup</div>
  )
}

interface Props {
  query: Query, 
  data: RunTestResponse
}

export default ChartGroup