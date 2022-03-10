import React from 'react';
import { MdGroup } from 'react-icons/md';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';
import { RunTestResponse } from '../../models/api';
 

const BoxPlot = (props: Props) => {

  const data = props.data;
  console.log(data);

  const explainAnalyzeResults = data.testData.filter((response) => { response.method === 'EXPLAIN'});
  const actualResults = data.testData.filter((response) => { response.method === 'QUERY' });

  return (
    <Plot
    data={[
    {
    type: 'box', 
    name: 'Summary Stats',
    y: [
      data.summaryStats.min,
      data.summaryStats.q1,
      data.summaryStats.median,
      data.summaryStats.q3,
      data.summaryStats.max
    ],
    marker: {
        color: 'rgb(163, 210, 202)'
      },
      boxmean: 'sd'
    },
    
    // {
    // type: 'box', 
    // name: 'Explain Analyze',
    // y: explainAnalyzeResults.map((item) => { return item.queryTime }),
    // marker: {
    //     color: 'rgb(240, 89, 69)',
    //   },
    //   boxmean: 'sd'
    // },
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
