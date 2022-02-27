import React, { useState } from 'react'
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled from 'styled-components';
import Layout from './Layout';
import { addQuery, deleteQuery } from '../middleware/dbThunk';
import CustomSelect from '@mui/material/Select'
import { connect } from 'react-redux';
import { Query } from '../models/database';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Database from '../models/database';




const Queries = (props) => {
  
  const databases: Array<Database> = Object.values(props.databases);
  const [dbId, setDbId] = useState(databases.length === 0 ? undefined : databases[0].id );


  const handleNewQuery = (query) => {
    props.addQuery(dbId, query)
  }
  
  const handleDelete = (queryId) => { 
    props.deleteQuery(dbId, queryId) 
  }

  // called when the an option from the database dropdown selector is chosen
  const handleDbChange = (e) => {   
    if (e.target.value) setDbId(e.target.value);
  }


  return (
    <Layout>
      <Container>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {/* -------- select database dropdown ------ */}
          <select value={dbId} onChange={handleDbChange}>
            { Object.values(props.databases).map((db : Database, i) => {
              return (
                <option key={i} value={db.id}>
                  {db.label}
                </option>
              )
            })}
          </select> 
          <NewQueryWindow newQueryFunc={handleNewQuery}/>
        </div>
        <QueryGroup>
          {/* ------ query cards ------ */}
          { dbId !== undefined && 
            Object.values(props.databases[dbId].queries).map((query : Query, i) => {
            return <QueryCard
              label={'some random label'}
              key={i} 
              deleteQueryFunc={handleDelete}
              id={query.id} 
              sqlQuery={query.queryString}
            />
          })}
        </QueryGroup>
      </Container>


    </Layout>
  )
}


// ---------------- dispatch ------------ // 
const mapStateToProps = (state) => ({
  databases: state.app.databases
});

const mapDispatchToProps = (dispatch) => ({
  addQuery: (databaseId, query) => { dispatch(addQuery(databaseId, query)) },
  deleteQuery: (databaseId, queryId) => { dispatch(deleteQuery(databaseId, queryId)) }
})



// ----------- styled component ---------- // 

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;


const QueryGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(220, 220 ,220); 
  // width: 100%;
  padding: 1em 2em;
  overflow-y: scroll;
  overflow-x: scroll;
`;



export default connect(mapStateToProps, mapDispatchToProps)(Queries);