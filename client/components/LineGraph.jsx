import React from 'react'
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/*
Example Data: [{ x: 1, y: 2}, { x: 2, y: 3 }, { x: 5, y: 5}]
*/

const LineGraph = (props) => {
  const {
    data,
    height,
    width, 
    margin
  } = props; 
  
  const svgRef = React.useRef(null);
  const svgWidth = width + margin.left + marigin.right;
  const svgHeight = height + margin.top + margin.bottom ;

  // x axis function 
  const xScale = d3.scaleLog(10).ran
  .domain
  .range([0, d3.max(Object.values(data)) ])
  

  // y axis function 
  return (
    <div>LineGraph</div>
  )
}

LineGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  height: PropTypes.number.isRequired, 

  
}


export default LineGraph