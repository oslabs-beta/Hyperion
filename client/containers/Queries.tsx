import React, { useState } from 'react'
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled, { keyframes } from 'styled-components';
import Layout from './Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Database, Query } from '../models/database';
import { AiOutlinePlusCircle, AiOutlineQuestionCircle } from 'react-icons/ai';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import Button from '@mui/material/Button';
import { addQuery, deleteQuery } from '../features/data/dataSlice';
import { RootState } from '../features/store';
import { isNum } from '../utils/inputs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const Queries = (props) => {
  // TODO  --- on each submission of form, delete allt eh values from the input fields 
  const dbMap = useSelector((state: RootState) => state.data.databases);

  const databases = Object.values(useSelector((state: RootState) => state.data.databases));


  const dispatch = useDispatch();

  // state --------
  const [dbId, setDbId] = useState(databases.length === 0 ? undefined : databases[0].id );
  const [newWindowVisible, setNewWindowVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  console.log('this is databases from queries', databases, 'this is current dbId', dbId)

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

  const handleDeleteQuery = (queryId: number) => {
    dispatch(deleteQuery({ queryId: queryId, databaseId: dbId }));
  }

  // need error checking 
  const handleNewQuery = async (query: string, label: string) => {
    console.log(dbId)
    if (dbId === undefined) return;
    

    // adds a semicolon if it is not there already 
    if (query[query.length - 1] !== ';') query = query.concat(';');
    query = query.trim();
    label = label.trim();
    if (paramArr.length === 0) {
      return dispatch(addQuery({ databaseId: dbId, query: query, label: label, params: [[]] }))
    }
    const params = [];

    for (let i = 0; i < paramArr.length; i++) {
      // one placedholder value of params in string form 
      let stringParams: string = paramArr[i];

      // remove the trailing comma if there is one 
      if (stringParams[stringParams.length - 1] === ',') {
        stringParams = stringParams.substring(0, stringParams.length - 2); 
      }
      // the same string params as an array
      const splitParams: Array<any> = stringParams.split(',');
      for (let i = 0; i < splitParams.length; i++) {
        // if it is a number, turn into a number
        if (isNum(splitParams[i])) splitParams[i] = Number(splitParams[i])
        else {
          splitParams[i] = splitParams[i].trim();
        }
      }
      params.push(splitParams)
    }

    await dispatch(addQuery({ databaseId: dbId, query: query, label: label, params: params }));
  }

  const handleCloseModal = () => { setModalVisible(false); }

  const handleOpenModal = () => { setModalVisible(true) }
  
  // called when the an option from the database dropdown selector is chosen
  const handleDbChange = (e) => {   
    if (e.target.value) setDbId(e.target.value);
  }

  return (
    <Layout>
      <div className='content-box' onClick={handleCloseModal}>
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
            <div style={{display: 'flex', columnGap: '20px'}}>
              <AiOutlineQuestionCircle size={25} onClick={handleOpenModal} />
              <AiOutlinePlusCircle size={25} onClick={() => { setNewWindowVisible(!newWindowVisible) }}/>
            </div>
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
      <Modal 
        open={modalVisible}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            How to add a new query 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            1. Click on the plus sign on the right of the screen. A modal will appear. <br/>
            2. Input in a label, or how the query will be referred to<br/>
              - ie. 'People between some height range'<br/>
            3. Input the query with/without placeholders in PostgreSQL $ placeholder format. <a href='https://www.postgresql.org/docs/9.1/sql-prepare.html'>Postgres Docs</a><br/>
              - There is no need to add parentheses or a semicolon at the end of the query <br/>
              - Example: SELECT * FROM people WHERE height {'<'} {'$1'} AND height {'>'} {'$2'} <br/>
            4. If you have not placed any placeholders, you can put this on the next page<br/>
            5. If you have chosen to add parameter placeholders, click on the add parameter field for each placeholder field you have in your query. 
              - Here you will enter each value in the field with commas indicating separate parameters for the given placeholder <br/>
              - Example: first box: 30, 25, 100 second field: 2, 15, 30
            5. When you are done, click the add query button to save
          </Typography>
        </Box>
      </Modal>
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