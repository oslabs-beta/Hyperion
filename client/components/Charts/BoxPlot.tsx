import React from 'react';
import { MdGroup } from 'react-icons/md';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';
import { RunTestResponse } from '../../models/api';
 

const BoxPlot = (props: Props) => {

  const data = props.data;

  const filter = (array, string) => {
    const output = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].method === string) {
        output.push(array[i]);
      }
    }
    return output; 
  }


  // const explainAnalyzeResults = data.testData.filter((response) => { response.method === 'EXPLAIN'});
  // const actualResults = data.testData.filter((response) => { response.method === 'QUERY' });
  const explainAnalyzeResults = filter(data.testData, 'EXPLAIN');
  const actualResults = filter(data.testData, 'QUERY');


  return (
    <Plot
    data={[
    {
    type: 'box', 
    name: 'Explain Analyze',
    y: explainAnalyzeResults.map((item, i) => { return item.queryTime }),
    marker: {
        color: 'rgb(163, 210, 202)'
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
