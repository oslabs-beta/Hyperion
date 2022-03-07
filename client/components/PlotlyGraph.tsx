import React from 'react';
import Plot from 'react-plotly.js';

const Chart =() => {

    return (
        <Plot
          data={[
            {
              x: [1,2,3,4,5],
              y: [0.8, 0.3, 0.4, 0.2, 0.1],
              type: 'scatter',
              mode: 'lines+markers',
              line: {color: 'purple',
                    width:2,
            },
            },
            {
            x: [1,2,3,4,5], 
            y: [0.5, 0.3, 0.1, 0.9, 0.7],
            type: 'scatter', 
            line: {color: 'blue',
             width:2,       
        },
        },
          ]}
          layout={ {width: 500, 
                    height: 400, 
                    title: 'Query Runtime',
                    xaxis: {title: 'Test #',
                    mirror: false,
                    ticks: 'outside',
                    showline: true,
                    showgrid: false,
                },
                    yaxis: {title: 'Runtime(ms)',
                    mirror: false,
                    ticks: 'outside',
                    showline: true,
                    showgrid: false,
                    },
                    paper_bgcolor: 'white',
                }}
         
                    
        />
      );
}

export default Chart;
  
  