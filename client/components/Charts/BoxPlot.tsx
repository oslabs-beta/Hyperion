import React from 'react';
import { MdGroup } from 'react-icons/md';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';
import { RunTestResponse } from '../../models/api';
 

const BoxPlot = (props: Props) => {

  const data = props.data;
  const explainAnalyzeResults = data.testData.filter((response) => { response.method === 'EXPLAIN'});
  const actualResults = data.testData.filter((response) => { response.method === 'QUERY' });

  return (
    <Plot
    data={[
    {
    type: 'box', 
    name: 'Actual',
    y: actualResults.map((item) => { return item.queryTime }),
    marker: {
        color: 'rgb(163, 210, 202)'
      },
      boxmean: 'sd'
    },
    
    {
    type: 'box', 
    name: 'Explain Analyze',
    y: explainAnalyzeResults.map((item) => { return item.queryTime }),
    marker: {
        color: 'rgb(240, 89, 69)',
      },
      boxmean: 'sd'
    },
    ]}

    layout= {{
      title: 'Query Runtime Statistics',
      showgrid: false,
      xaxis: { 
        title: 'Test',
        showgrid: false,
        showline: true,
      },
      yaxis: { 
        title: 'Runtime (ms)',
        showgrid: false,
        zeroline: false,
        showline: true,
      },
    }}/>
  )
};


interface Props {
  data: RunTestResponse
}

export default BoxPlot;
