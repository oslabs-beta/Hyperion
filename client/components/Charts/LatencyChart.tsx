import React from 'react';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';
import { RunTestResponse } from '../../models/api';
const props = {
    data : {
      queryResults: {
        explainAnalyzeResults: {
          resultsArray: [0.1, 0.15, 0.3, 0.3, 0.4],
          latency: [0.1, 0.15, 0.3, 0.3, 0.4],
          stats: {
            min: .1,
            max: .5, 
            mean: .35, 
            median: .3,
            stdDev: .05, 
            q1: .15,
            q3: .4
          }
        }
      }, 
      testResults: {
        resultsArray: [0.2, 0.25, 0.4, 0.5, 0.7],
        latency: [0.2, 0.25, 0.4, 0.5, 0.7],
        stats: {
          min: .3,
          max: .5, 
          mean: .45, 
          median: .3,
          stdDev: .05, 
          q1: .2,
          q3: .5
        }
      }
    }
  }


const LatencyChart = (props: Props) => {
  const data = props.data;
  const yExplainLatency = data.queryResults.explainAnalyzeResults.latency;
  const xExplainLatency = yExplainLatency.map((value, i) => { return i + 1} );
  const yActualLatency = data.testResults.latency; 
  const xActualLatency = yActualLatency.map((value, i) => { return i + 1 });

  // could refactor to and redefine data above 
  return (
    <Plot
      data={[{
          x: xExplainLatency,
          y: yExplainLatency,
          name: 'Explain Analyze Latency',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(240, 89, 69)', width:2 },
        }, 
        {
          x: xActualLatency,
          y: yActualLatency,
          name: 'Actual Latency',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(94, 170, 168)', width:2 }
        },
        {
          x: [1,2,3,4,5], //update when we know where the data will be sent back
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