import React, { useEffect } from 'react';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';
import Layout from './Layout';
import { connect } from "react-redux";
import * as thunk from '../middleware/dbThunk';


// -------- main component ---------- //
const Databases = (props) => {  

  return (
    <Layout>
      <StyledContainer>
        
        <DatabaseGroup>
          <h4>My Databases</h4>
        {/* example */}
          <DatabaseCard id={1} isConnected={true} connectDbFunc={props.connectDb} deleteDbFunc={props.deleteDb} database='db1.aws.com' port={5432} user='postgres' ssl='Required'></DatabaseCard>
          {/* {props.databases.map(database => {
            return <DatabaseCard 
              id={database.id} 
              isConnected={database.isConnected}
              connectDbFunc={props.connectDb}
              deleteDbFunc={props.deleteDb}
              database={database.database} 
              port={database.port}
              user={database.user} 
              ssl={database.ssl} 
              latency={database.latency}
              />
          })} */}
          <DatabaseCard database='db1.aws.com' port={5432} user='postgres' ssl='Required'></DatabaseCard>
          <DatabaseCard database='db1.aws.com' port={5432} user='postgres' ssl='Required'></DatabaseCard>
        </DatabaseGroup>
        <NewDatabaseWindow addDbFunc={props.addDb}/>
      </StyledContainer>
    </Layout>
  )
}


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
  deleteDb: (id) => { dispatch(thunk.deleteDb(id)) }
})


const DatabaseGroup = styled.div`
  background-color: rgb(220, 220 ,220); 
  width: 100%;
  padding: 1em 2em;
  overflow-y: scroll;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Databases);