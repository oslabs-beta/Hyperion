import React, { useState } from 'react'
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled from 'styled-components';
import Layout from './Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Database, Query } from '../models/database';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import Button from '@mui/material/Button';
import { addQuery, deleteQuery } from '../features/data/dataSlice';
import { RootState } from '../features/store';



const Queries = (props) => {
  // TODO  --- on each submission of form, delete allt eh values from the input fields 

  const dbMap = useSelector((state: RootState) => state.data.databases);

  const databases = Object.values(useSelector((state: RootState) => state.data.databases));

  const dispatch = useDispatch();

  // state --------
  const [dbId, setDbId] = useState(databases.length === 0 ? undefined : databases[0].id );
  const [newWindowVisible, setNewWindowVisible] = useState(false);

  // need error checking 
  const handleNewQuery = (query: string, label: string, params: string) => {
    if (dbId === undefined) return; 
    dispatch(addQuery({ databaseId: dbId, query: query, label: label, params: params }));
  }


  // need error checking 
  const handleDeleteQuery = (queryId: number) => {
    dispatch(deleteQuery({ queryId: queryId, databaseId: dbId }));
  }

  // called when the an option from the database dropdown selector is chosen
  const handleDbChange = (e) => {   
    if (e.target.value) setDbId(e.target.value);
  }

  return (
    <Layout>
      <div className='content-box'>
        <nav className='card-header'>
          <h4>Queries</h4>
          <div>
            <div>
              Select Database
            </div>
            <select className='app-dropdown' value={dbId} onChange={handleDbChange}>
              { databases.map((db : Database, i) => {
                return (
                  <option key={i} value={db.id}>
                    {db.label}
                  </option>
                )
              })}
            </select> 
          </div>
        </nav>
      </div>
      <div>
        <div className='content-box'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h4>My Queries</h4>
            <AiOutlinePlusCircle  onClick={() => { setNewWindowVisible(!newWindowVisible) }}/>
          </div>
          { dbId !== undefined && 
            Object.values(dbMap[dbId].queries).map((query: Query, i) => {
            return <QueryCard
              label={'some random label'} // change this to the query label 
              key={i} 
              deleteQueryFunc={handleDeleteQuery}
              id={query.id} 
              sqlQuery={query.queryString}
              params={query.params}
            />
          })}
        </div>
      </div>
      { newWindowVisible === true && <NewQueryWindow toggleCloseFunc={()=> { setNewWindowVisible(!newWindowVisible) }} newQueryFunc={handleNewQuery}/> }
    </Layout>
  )
}



// ----------- styled component ---------- // 


const QueryGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(220, 220 ,220); 
  // width: 100%;
  padding: 1em 2em;
  overflow-y: scroll;
  overflow-x: scroll;
`;



export default Queries;