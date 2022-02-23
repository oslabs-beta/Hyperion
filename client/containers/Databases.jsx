import React, { useEffect } from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';

import { connect } from "react-redux";
import * as thunk from '../middleware/dbThunk';

// ---------------- dispatch ------------ // 
const mapStateToProps = (state) =>({
  databaseList: state.db.databaseList,
});

const mapDispatchToProps = (dispatch) => ({
  addDb: (formData) => { dispatch(thunk.addDb(formData)) },
  deleteDb: (id) => { dispatch(thunk.deleteDb(id)) }
})

// -------- main component ---------- //
const Databases = (props) => {  
  return (
    <StyledContainer>
      <VerticalNavbar />
      <div className='database-group' > 
        <h4>My Databases</h4>
        {/* example */}
        <DatabaseCard id={1} isConnected={true} connectDbFunc={props.connectDb} deleteDbFunc={props.deleteDb} database='db1.aws.com' port={5432} user='postgres' ssl='Required'></DatabaseCard>
        {/* {databaseList.map(database => {
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
      </div>
      <NewDatabaseWindow addDbFunc={props.addDb}/>
    </StyledContainer>
  )
}


// ----------- styled component ---------- // 
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row; 
  height: 100%; 
  width: 100%;
  justify-content: space-between; 

  .database-group {
    background-color: rgb(220, 220 ,220); 
    width: 100%;
    padding: 1em 2em;
    overflow-y: scroll;
  }

`;

connect(mapStateToProps, mapDispatchToProps)(Databases);
export default Databases