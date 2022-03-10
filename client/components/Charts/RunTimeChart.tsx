import React from 'react';
import Plot from 'react-plotly.js';
import { RunTestResponse } from '../../models/api';


const LineChart = (props: Props) => {

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
  
  console.log('data before filter', data.testData)
  const explainAnalyzeResults = filter(data.testData, 'EXPLAIN');
  const actualResults = filter(data.testData, 'QUERY');
  // const explainAnalyzeResults = data.testData.filter((response) => { response.method === 'EXPLAIN'});
  // const actualResults = data.testData.filter((response) => { response.method === 'QUERY' });

  console.log('explain analyze results', explainAnalyzeResults, 'actual results', actualResults)
  return (
    <Plot
      data={[
        {
          x: explainAnalyzeResults.map((item, index) => { return index + 1 }),
          y: explainAnalyzeResults.map((item, i) => { return item.queryTime }),
          name: 'Explain Analyze',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(240, 89, 69)', width: 2 },
        },
        {
          x: actualResults.map((item, index) => { return index + 1}),
          y: actualResults.map((item) => { return item.queryTime }),
          name: 'Actual',
          type: 'scatter', 
          line: { color: 'rgb(163, 210, 202)', width:2 },
      }]}
      layout={{
        title: 'Query Runtime',
        xaxis: { 
          title: 'Test #',
          mirror: false,
          ticks: 'outside',
          showline: true,
          showgrid: false,
        },
        yaxis: {
          title: 'Runtime(ms)',
          mirror: false,
          ticks: 'outside',
          showline: true,
          showgrid: false,
        },
        paper_bgcolor: 'white',
      }} 
    />  
  );
};

interface Props {
  data: RunTestResponse
}

export default LineChart;
  
  