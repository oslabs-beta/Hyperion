import React, { useState } from 'react'
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled from 'styled-components';
import Layout from './Layout';
import { addQuery, deleteQuery } from '../middleware/dbThunk';
import CustomSelect from '@mui/material/Select'
import { connect } from 'react-redux';

import { InputLabel, MenuItem, FormControl } from '@mui/material';





const Queries = (props) => {
  
  const [dbId, setDbId] = useState(null);

    // validation 
  // adding these functions to event handlers on the buttons 

  const handleNewQuery = (query) => {
    props.addQuery(dbId, query)
  }
  
  const handleDelete = () => {
  
  }

  const handleDbChange = (e) => {
    console.log('e.target.value', e.target.value)
    if (e.target.value) setDbId(e.target.value);
    console.log(typeof dbId)
    console.log('this is props.databases[dbId]', props.databases[dbId]);
    console.log('in handleDbChange. the newdbId is ', dbId)
  }



  return (
    <Layout>
      <QueryGroup>
        <FormControl>
          <CustomSelect
            label='Databases'
            onChange={handleDbChange}
            value={''}
          >
            { Object.values(props.databases).map((database, index) => {
              return (
                <MenuItem 
                  key={index}
                  name={database.label} 
                  value={database.id}
                >
                  {database.label}
                </MenuItem>
              )
            }) }
          </CustomSelect>
        </FormControl>
        { dbId && 
          props.databases[dbId].getQueries().map((query, i) => {
          return <QueryCard
            key={i} 
            deleteQueryFunc={props.deleteQuery}
            id={query.id} 
            sqlQuery={query.queryString}
          />
        })}
        
        <QueryCard deleteQueryFunc={props.deleteQuery} sqlQuery = 'SELECT * FROM table_name'></QueryCard>
      <NewQueryWindow newQueryFunc={handleNewQuery}/>
      </QueryGroup>
    </Layout>
  )
}


// ---------------- dispatch ------------ // 
const mapStateToProps = (state) => { 
  return {
    databases: state.app.databases
  }
};

const mapDispatchToProps = (dispatch) => ({
  addQuery: (databaseId, query) => { dispatch(addQuery(databaseId, query)) },
  deleteQuery: (databaseId, queryId) => { dispatch(deleteQuery(id)) }
})


// ----------- styled component ---------- // 
const QueryGroup = styled.div`
display: flex;
  background-color: rgb(220, 220 ,220); 
  width: 100%;
  padding: 1em 2em;
  overflow-y: scroll;
`;



export default connect(mapStateToProps, mapDispatchToProps)(Queries);