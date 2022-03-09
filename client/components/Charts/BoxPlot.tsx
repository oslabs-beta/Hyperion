import React from 'react';
import { MdGroup } from 'react-icons/md';
import Plot from 'react-plotly.js';
import { runQueryAnalyze } from '../../../server/models/dbModel';

const props = {
  data : {
    queryResults: {
      explainAnalyzeResults: {
        resultsArray: [0.1, 0.15, 0.3, 0.3, 0.4, 0.6],
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
 
//props: Props 
const BoxPlot = () => {

const data = props.data;

const yExplain = data.queryResults.explainAnalyzeResults.resultsArray;
const yActual = data.testResults.resultsArray; 

return (
    <Plot
    data={[
    {
    type: 'box', 
    name: 'Actual',
    y: yActual,
    marker: {
        color: 'rgb(163, 210, 202)'
      },
      boxmean: 'sd'
    },
    
    {
    type: 'box', 
    name: 'Explain Analyze',
    y: yExplain,
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
            title: 'Test #',
            showgrid: false,
            showline: true,
          },
        yaxis: { 
            title: 'Runtime (ms)',
            showgrid: false,
            zeroline: false,
            showline: true,
          },
    }
}

    />
    )

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

export default BoxPlot;
