import React from 'react';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';
import Layout from './Layout';
import { connect } from "react-redux";
import * as thunk from '../middleware/dbThunk';
import Database from '../models/database';


// -------- main component ---------- //
const Databases = (props) => {  
  return (
    <Layout>
      <StyledContainer>
        <DatabaseGroup>
          <h4>My Databases</h4>
          {Object.values(props.databases).map((db : Database, i) => {
            return <DatabaseCard
              key={i}
              id={db.id}
              label={db.label}
              isConnected={db.isConnected}
              connectDbFunc={props.connectDb}
              deleteDbFunc={props.deleteDb}
              database={db.pgDatabaseName} 
              port={db.port} 
              user={db.user}  // not sure if needed
              ssl={db.sslMode}
              latency = {db.latency}
            />
          })}
        </DatabaseGroup>
        <NewDatabaseWindow addDbFunc={props.addDb}/>
      </StyledContainer>
    </Layout>
  )
}

// ----------- styling ---------- // 
const StyledContainer = styled.div`
  display: flex; 
  height: 100%; 
  // flex-wrap: nowrap;
`;


// ---------------- dispatch ------------ // 
const mapStateToProps = (state) =>({
  databases: state.app.databases
});

const mapDispatchToProps = (dispatch) => ({
  addDb: (formData) => { dispatch(thunk.addDb(formData)) },
  deleteDb: (id) => { 
    dispatch(thunk.deleteDb(id)) 
  }
})

const DatabaseGroup = styled.div`
  background-color: rgb(220, 220 ,220); 
  width: 100%;
  padding: 1em 2em;
  overflow-y: scroll;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Databases);