import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from '../models/database';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);



const QueryCard = (props: Props) => {

  const { query, deleteQueryFunc } = props; 

    return (
    <Card sx={{ minWidth: 275 }}>
      {/* <Grid container spacing={2}>

      </Grid> */}
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions dir=''>
        <Button size="small">Learn More</Button>
        <Button 
          onClick={() => {deleteQueryFunc(query.id)}} 
          variant='outlined'
          size='small' 
          color='error'
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );

  // return (
  //   <div className='database-card'>
  //     <div className='info-group'>
  //       <div className='info-group-item'>
  //         <h5>Label:</h5>
  //         <div>{query.label}</div>
  //       </div>
  //       <div className='info-group-item query-box'>
  //         <h5>Query</h5>
  //         <div>{query.queryString}</div>
  //       </div>
  //       <div className='info-group-item'>
  //         <h5>Parameters</h5>
  //         <div>{JSON.stringify(query.params)}</div>
  //       </div>
  //       { 
  //         query.throttle && 
  //         <>
  //           {/* <div className='vl'/> */}
  //           <div className='info-group-item'>
  //             <h5>Throttle</h5>
  //             <div>{query.throttle}</div>
  //           </div>
  //         </>
  //       }
  //       { 
  //         query.maxConnections && 
  //         <>
  //         {/* <div className='vl'/> */}
  //         <div className='info-group-item'>
  //           <h5>Max Connections</h5>
  //           <div>{query.maxConnections}</div>
  //         </div>
  //         </>
  //       }
  //       { 
  //         query.repeat && 
  //         <>
  //           {/* <div className='vl'/> */}
  //           <div className='info-group-item'>
  //             <h5>Repeat</h5>
  //             <div>{query.repeat}</div>
  //           </div>
  //         </>
  //       }
  //     </div>
  //     <div className='button-group'>
  //       <Button 
  //         onClick={() => {deleteQueryFunc(query.id)}} 
  //         variant='outlined'
  //         size='small' 
  //         color='error'
  //       >
  //         Remove
  //       </Button>
  //     </div>
  //   </div>
  // )
}

interface Props {
  query: Query, 
  deleteQueryFunc: Function, 
}

export default QueryCard