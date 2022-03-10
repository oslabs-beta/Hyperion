import React from 'react';
import styled from 'styled-components';
import { Query } from '../models/database';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


const QueryCard = (props: Props) => {

  const { query, deleteQueryFunc } = props; 

    return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
          Label
        </Typography>
        <Typography variant="h5" component="div">
          {query.label}
        </Typography>
        <Typography variant="body2">
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Query String 
            <br/>
            { query.queryString }
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Parameters
            <br/>
            { JSON.stringify(query.params) }
          </Typography>
        </Typography>
      </CardContent>
      <CardActions dir=''>
        {/* <Button size="small">Edit</Button>  */}
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
}

interface Props {
  query: Query, 
  deleteQueryFunc: Function, 
}

export default QueryCard