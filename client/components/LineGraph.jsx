import React from 'react'
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/*
Example Data: [{ x: 1, y: 2}, { x: 2, y: 3 }, { x: 5, y: 5}]
*/
const exampleData = []
for (let i = 0; i < 10; i++) {
  exampleData.push({ x: i, y: i ** 5 })
}

const LineGraph = (props) => {
  const {
    data = exampleData,
    margin = { top: 40, right: 80, bottom: 60, left: 50 },
    width = 400,
    height = 300, 
    color = 'Purple'
  } = props;


  const xData = [];
  const yData = [];

  for (let i = 0 ; i < data.length; i++) {
    xData[i] = data[i].x;
    yData[i] = data[i].y;
  }

  const yMinVal = d3.min(yData);
  const yMaxVal = d3.max(yData);  
  // const yMinVal = d3.min(data, (d) => {d.y});
  // const yMaxVal = d3.max(data, (d) => {d.y});

  console.log('yMinVal', yMinVal, 'yMaxVal', yMaxVal)
  
  const getX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.x))
    .range([0, width]);
  
  const getY = d3
    .scaleLinear()
    .domain([yMinVal - 1, yMaxVal + 2])
    .range([height, 0]);
    
  const getXAxis = (ref) => {
    const xAxis = d3.axisBottom(getX)
    d3.select(ref).call(xAxis)
  }

  const getYAxis = (ref) => {
    const yAxis = d3.axisLeft(getY)
      // .ticks(5)
      // .tickSize(-width)
      // .tickPadding(7);
    d3.select(ref).call(yAxis);
  }

  const linePath = d3
    .line()
    .x((d) => getX(d.x))
    .y((d) => getY(d.y))
    .curve(d3.curveMonotoneX)(data);


  const areaPath = d3 
    .area()
    .x((d) => getX(d.x))
    .y0((d) => getY(d.y))
    .y1(() => getY(yMinVal -1))
    .curve(d3.curveMonotoneX)(data);
    
  return (
    <svg viewBox={`0 0 ${width + margin.left + margin.right} 
    ${height + margin.top + margin.bottom}`} >
       {/* // x- and y-axes */}
          <g className="axis" ref={getYAxis} />
          <g
              className="axis xAxis"
              ref={getXAxis}
              transform={`translate(0,${height})`}
          />
        {/* // area and line paths */}
          <path fill={color} d={areaPath} opacity={0.3} />
          <path strokeWidth={2} fill="none" stroke={color} d={linePath} />
     {/* ÷÷÷ */}
          <text
              transform={"rotate(-90)"}
              x={0 - height / 2} y={0 - margin.left} dy="1em">
              {"USD"}
          </text>
        {/* // chart title÷÷÷ */}
          <text
              x={width / 2} y={0 - margin.top / 2} textAnchor ="middle" >
              {"USD to RUB Exchange Rates, 2020"}
          </text>
        {/* // chart subtitle÷÷÷ */}


          {data.map((item, index) => {
              return (
                  <g key={index}>
                  {/* // hovering text ÷÷÷ */}
                      <text
                          fill="#666"
                          x={getX(item.x)}
                          y={getY(item.y) - 20}
    
                          textAnchor="middle"
                      >
                          {/* {index === activeIndex ? item.price : ""} */}
                      </text>
                     {/* // hovering circle÷÷÷ */}
                      {/* <circle
                          cx={getX(item.date)}
                          cy={getY(item.price)}
                          r={index === activeIndex ? 6 : 4}
                          fill={color}
                          strokeWidth={index === activeIndex ? 2 : 0}
                          stroke="#fff"
                          style={{ transition: "ease-out .1s" }}
                      /> */}
                  </g>
              );
          })}

    </svg>
  )
}

// LineGraph.propTypes = {
//   data: PropTypes.arrayOf(PropTypes.object).isRequired  
// }


export default LineGraph