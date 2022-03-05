import React, { useState } from 'react';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';
import Layout from './Layout';
import { useSelector, useDispatch } from "react-redux";
import Database from '../models/database';
import { RootState } from '../features/store';
import { NewDatabaseForm } from '../models/database';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { addDbThunk, deleteDb } from '../features/data/dataSlice';



// -------- main component ---------- //
const Databases = (props) => {  
  
  const databases = useSelector((state: RootState) => state.data.databases);

  const [modalVisible, setModalVisible] = useState(false);
  
  const dispatch = useDispatch();

  const handleDbAdd = (formData: NewDatabaseForm) => {
    dispatch(addDbThunk(formData));
  }

  const handleDbDelete = (id: number) => {
    dispatch(deleteDb(id));
  }

  return (
    <Layout>
      <div className='content-box'>
        <nav className='card-header'>
          <h4>Databases</h4>
          <div>
            <AiOutlinePlusCircle  onClick={() => { setModalVisible(!modalVisible) }}/>
        </div>
        </nav>
      </div>
      <div>
        <DatabaseGroup className='content-box'>
          <h4>My Databases</h4>
          {Object.values(databases).map((db : Database, i) => {
            return <DatabaseCard
              key={i}
              id={db.id}
              label={db.label}
              isConnected={db.isConnected}
              deleteDbFunc={handleDbDelete}
              database={db.pgDatabaseName} 
              port={db.port} 
              user={db.user}  // not sure if needed
              ssl={db.sslMode}
              latency = {db.latency}
            />
          })}
        </DatabaseGroup>
      </div>
      { modalVisible  && 
        <NewDatabaseWindow addDbFunc={handleDbAdd}/>
      }
    </Layout>
  )
}

// ----------- styling ---------- // 
const StyledContainer = styled.div`
  display: flex; 
  height: 100%; 
  background-color: red;
  // flex-wrap: nowrap;
`;


const DatabaseGroup = styled.div`
  // background-color: rgb(220, 220 ,220); 
  // width: 100%;
  // padding: 1em 2em;
  // overflow-y: scroll;
`;

export default Databases;