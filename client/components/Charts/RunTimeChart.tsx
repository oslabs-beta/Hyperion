import React from 'react';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';


// const data = {
//   queryResults: {
//     explainAnalyzeResults: {
//       resultsArray: [0.1, 0.2, 0.3, 0.3, 0.3, .5],
//       stats: {
//         min: .1,
//         max: .5, 
//         mean: .35, 
//         median: .3,
//         stdDev: .05, 
//         q1: .15,
//         q3: .4
//       }
//     }
//   }, 
//   testResults: {
//     resultsArray: [0.5, 0.6, 0.6, 0.7, 0.7],
//     stats: {
//       min: .3,
//       max: .7, 
//       mean: .45, 
//       median: .3,
//       stdDev: .05, 
//       q1: .3,
//       q3: .6
//     }
//   }
// }


const LineChart = (props: Props) => {
  const data = props.data; 

  const yExplain = data.queryResults.explainAnalyzeResults.resultsArray;
  const xExplain = yExplain.map((value, i) => { return i + 1} );

  const yActual = data.testResults.resultsArray; 
  const xActual = yActual.map((value, i) => { return i + 1 });

  return (
    <Plot
      data={[
        {
          x: xExplain,
          y: yExplain,
          name: 'Explain Analyze',
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: 'rgb(240, 89, 69)', width:2 },
        },
        {
          x: xActual,
          y: yActual,
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
  data: {
    queryResults: {
      explainAnalyzeResults: {
        resultsArray: Array<number>,
        stats: {
          min: number,
          max: number,
          mean: number,
          median: number, 
          stdDev: number, 
          q1: number, 
          q3, number,
        }
      }
    },
    testResults: {
      resultsArray: Array<number>,
      stats: {
        min: number,
        max: number,
        mean: number,
        median: number, 
        stdDev: number, 
        q1: number, 
        q3, number,
      }
    }
  }
}
// const data = {
//   queryResults: {
//     explainAnalyzeResults: {
//       resultsArray: [0.1, 0.2, 0.3, 0.3, 0.3, .5],
//       stats: {
//         min: .1,
//         max: .5, 
//         mean: .35, 
//         median: .3,
//         stdDev: .05, 
//         q1: .15,
//         q3: .4
//       }
//     }
//   }, 
//   testResults: {
//     resultsArray: [0.5, 0.6, 0.6, 0.7, 0.7],
//     stats: {
//       min: .3,
//       max: .7, 
//       mean: .45, 
//       median: .3,
//       stdDev: .05, 
//       q1: .3,
//       q3: .6
//     }
//   }
// }


export default LineChart;
  
  