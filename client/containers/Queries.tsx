import React, { useState } from 'react'
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled, { keyframes } from 'styled-components';
import Layout from './Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Database, Query } from '../models/database';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import Button from '@mui/material/Button';
import { addQuery, deleteQuery } from '../features/data/dataSlice';
import { RootState } from '../features/store';
import { isNum } from '../utils/inputs';

const Queries = (props) => {
  // TODO  --- on each submission of form, delete allt eh values from the input fields 
  const dbMap = useSelector((state: RootState) => state.data.databases);

  const databases = Object.values(useSelector((state: RootState) => state.data.databases));

  const dispatch = useDispatch();

  // state --------
  const [dbId, setDbId] = useState(databases.length === 0 ? undefined : databases[0].id );
  const [newWindowVisible, setNewWindowVisible] = useState(false);

  // an array of strings that will need to be parsed later
  const [paramArr, setParamArray] = useState([]);


  // ------------------- props drilled methods to new query window --------
  // adds a parameter field to new query window 
  const addParamField = () => {
    const newParamArr = JSON.parse(JSON.stringify(paramArr.concat('')));
    setParamArray(newParamArr)
  }

  // removes a parameter input field from new query window 
  const removeParamField = (index: number) => { 
    if (index === 0) return setParamArray([]);
    else setParamArray(paramArr.splice(index, 1));
  }

  // changes the paramArray at the given index to the new value and resets the state 
  const handleParamArrChange = (index: number, value: string) => {
    const newArr = JSON.parse(JSON.stringify(paramArr));
    newArr[index] = value; 
    setParamArray(newArr);
  }

  // need error checking 
  const handleDeleteQuery = (queryId: number) => {
    dispatch(deleteQuery({ queryId: queryId, databaseId: dbId }));
  }

  // -------------------------------------------------



  // need error checking 
  const handleNewQuery = (query: string, label: string) => {
    // if (dbId === undefined) return;


    console.log('heres the object being passed to addQuery dispatch: ',{ databaseId: dbId, query: query, label: label, params: [[]] })
    if (paramArr.length === 0) {
      return dispatch(addQuery({ databaseId: dbId, query: query, label: label, params: [[]] }))
    }
    const params = [];

    for (let i = 0; i < paramArr.length; i++) {
      // one placedholder value of params in string form 
      const stringParams: string = paramArr[i];
      // the same string params as an array
      const splitParams: Array<any> = stringParams.split(',');
      for (let i = 0; i < splitParams.length; i++) {
        // if it is a number, turn into a number
        if (isNum(splitParams[i])) splitParams[i] = Number(splitParams[i])
      }
      params.push(splitParams)
    }

    dispatch(addQuery({ databaseId: dbId, query: query, label: label, params: params }));
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
        <div className='content-box database-group'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h4>My Queries</h4>
            <AiOutlinePlusCircle  onClick={() => { setNewWindowVisible(!newWindowVisible) }}/>
          </div>
          { dbId !== undefined && 
            Object.values(dbMap[dbId].queries).map((query: Query, i) => {
            return <QueryCard
              query={query}
              // label={'some random label'} // change this to the query label 
              key={i} 
              deleteQueryFunc={handleDeleteQuery}
            />
          })}
        </div>
      </div>
      { newWindowVisible === true &&
      <NewQueryWindow 
        toggleCloseFunc={()=> { setNewWindowVisible(!newWindowVisible) }} 
        newQueryFunc={handleNewQuery}
        paramArray={paramArr}
        addParamField = {addParamField}
        removeParamField = {removeParamField}
        handleChange={handleParamArrChange}
        /> 
      }
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