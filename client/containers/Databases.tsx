import React, { useState } from 'react';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';
import Layout from './Layout';
import { useSelector, useDispatch } from "react-redux";
import { Database } from '../models/database';
import { RootState } from '../features/store';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { addDbThunk, deleteDb } from '../features/data/dataSlice';
import { NewDatabaseRequestBody } from '../models/api';

// -------- main component ---------- //
const Databases = (props) => {  
  
  const databases = useSelector((state: RootState) => state.data.databases );

  const [modalVisible, setModalVisible] = useState(false);
  
  const dispatch = useDispatch();

  // invokes thunk function to make fetch request to server with formData, 
  // on success, updates the state with new database 
  const handleDbAdd = (formData: NewDatabaseRequestBody) => { dispatch(addDbThunk(formData)); }

  // invokes thunk function to delete database with given id on server database 
  const handleDbDelete = (id: number) => { dispatch(deleteDb(id)); }

  return (
    <Layout>
      <div className='content-box'>
        <nav className='card-header'>
          <h4>Databases</h4>
        </nav>
      </div>
      <div>
        <div className='content-box database-group'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>My Databases</h4>
            <AiOutlinePlusCircle  onClick={() => { setModalVisible(!modalVisible) }}/>
          </div>
          {Object.values(databases).map((db : Database, i) => {
            return <DatabaseCard
              key={i}
              database={db}
              id={db.id}
              label={db.label}
              isConnected={true}
              deleteDbFunc={handleDbDelete}
              port={db.port} 
              ssl={db.sslMode}
              latency = {db.latency}
            />
          })}
        </div>
      </div>
      { modalVisible  && 
        <NewDatabaseWindow toggleWindowFunc={() => { setModalVisible(!modalVisible) }} addDbFunc={handleDbAdd}/>
      }
    </Layout>
  )
}




export default Databases;