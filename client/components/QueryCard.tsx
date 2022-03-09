import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Query } from '../models/database';

const QueryCard = (props: Props) => {

  const { query, deleteQueryFunc } = props; 
  return (
    <Card className='query-card'>
      <div className='card-info-group'>
        <h5>Label</h5>
        <div>{query.label}</div>
      </div>
      <div className='card-info-group'>
        <h5>Query</h5>
        <div>{query.queryString}</div>
      </div>
      {/* <div className='vl'/> */}
      <div className='card-info-group'>
        <h5>Parameters</h5>
        <div>{JSON.stringify(query.params)}</div>
      </div>
      { 
        query.throttle && 
        <>
          {/* <div className='vl'/> */}
          <div className='card-info-group'>
            <h5>Throttle</h5>
            <div>{query.throttle}</div>
          </div>
        </>
      }
      { 
        query.maxConnections && 
        <>
        {/* <div className='vl'/> */}
        <div className='card-info-group'>
          <h5>Max Connections</h5>
          <div>{query.maxConnections}</div>
        </div>
        </>
      }
      { 
        query.repeat && 
        <>
          {/* <div className='vl'/> */}
          <div className='card-info-group'>
            <h5>Repeat</h5>
            <div>{query.repeat}</div>
          </div>
        </>
      }
      <div>
        <Button 
          onClick={() => {deleteQueryFunc(query.id)}} 
          variant='outlined'
          size='small' 
          color='error'
        >
          Remove
        </Button>
      </div>
    </Card>
  )
}


const Card = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: space-between; 
  .vl {
    border-left: 6px solid green;
    height: 500px;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    top: 0;
  }

  .card-info-group {
    display: flex;
    flex-direction: column
  }
`;

/*
    <StyledCard>
      <div className='info-group'>
        <div className='info-group-item'>
          <h5>SQL Query:</h5>
          {sqlQuery}
        </div>
        <div className='info-group-item'>
          <h5>Params:</h5>
          {params}
        </div>
      </div>
      <div className='button-group'>
        <Button 
          onClick={() => {deleteQueryFunc(id)}} 
          variant='outlined'
          size='small' 
          color='error'
        >
          Remove
        </Button>
      </div>  
    </StyledCard>
*/

interface Props {
  query: Query, 
  deleteQueryFunc: Function, 
}

// const StyledCard = styled.div`
//   // display: flex; 
//   // flex-direction: column; 
//   // border: 1.5px solid black;
//   // row-gap: 10px;
//   // margin-top: 100px;
//   // margin-bottom: 100px;
//   // margin-right: 150px;
//   // margin-left: 80px;
//   // padding: 10em 5em;
//   // border-radius: 40px;
//   // background-color: rgb(250, 250, 250);

//   // .info-group {
//   //     display: flex; 
//   //     flex-wrap: wrap;
//   //     justify-content: space-between;
//   //   }

//   //   .info-group-item {
//   //     display: flex; 
//   //     flex-direction: column; 
//   //   }
//   //   .info-group-item > h5 {
//   //     margin: 0px;
//   //   }

//   // .button-group {
//   //   display: flex; 
//   //   justify-content: right; 
//   //   column-gap: 5px;
//   // }
// `;

  export default QueryCard