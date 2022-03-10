import React from 'react';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';
import { RunTestResponse } from '../../models/api';

const LatencyChart = (props: Props) => {
  const data = props.data;
  const explainAnalyzeResults = data.testData.filter((response) => { response.method === 'EXPLAIN'});
  const actualResults = data.testData.filter((response) => { response.method === 'QUERY' });

  // could refactor to and redefine data above 
  return (
    <Plot
      data={[{
          x: explainAnalyzeResults.map((item, i) => { return i + 1 }),
          y: explainAnalyzeResults.map((item, i) => { return item.queryTime }), // change to latency ??? 
          name: 'Explain Analyze Latency',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(240, 89, 69)', width:2 },
        }, 
        {
          x: actualResults.map((item, i) => { return i + 1 }),
          y: actualResults.map((item) => { return item.queryTime }),
          name: 'Actual Latency',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(94, 170, 168)', width:2 }
        },
        {
          x: [1,2,3,4,5],   //update when we know where the data will be sent back
          y: [0.2, 0.4, 0.7, 0.75, 0.8],
          name: 'Baseline Latency',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(163, 210, 202)', width:2 }
        }
      ]} 
      layout={{
        title: 'Latency',
        xaxis: { 
          title: 'Test #',
          mirror: false,
          ticks: 'outside',
          showline: true,
          showgrid: false,
        },
        yaxis: { 
          title: 'Time (ms)',
          mirror: false,
          ticks: 'outside',
          showline: true,
          showgrid: false,
        }
      }}
    />
)}


interface Props {
  data: RunTestResponse
}

export default LatencyChart;