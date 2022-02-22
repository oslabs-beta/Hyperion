import React, { useEffect } from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';
import { addDb } from "../reducers/dbReducer";
import { connect } from "react-redux";


// ---------------- dispatch ------------ // 
const mapStateToProps = (state) =>({
  databaseList: state.db.databaseList,
});

// import store 
// store.dispatch();
// const dispatch = useDispatch();
//

const mapDispatchToProps = (dispatch) => ({
  // incomplete 
  addDb: (formObject) => {
    fetch('/api/db/new', )
      .then(res => res.json())
      .then(data => {
        // data.isConnected=true; 
        dispatch({ action: 'EXAMPLE', payload: formObject })
      })
      .catch(error => {

      })
  }, 
  deleteDb: (id) => {
    fetch(`/api/db/delete/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ action: 'DELETE_DB', payload: data })
      })
      .catch(error => {

      })
  },
  connectDb: (id) => {
    fetch(`/api/db/delete/${id}`)
      .then(res => res.json())
      .then(data => {
        dispatch({ action: 'DELETE_DB', payload: data })
      })
      .catch(error => {

      })
  }
})

// -------- main component ---------- //
const Databases = (props) => {  
  return (
    <StyledContainer>
      <VerticalNavbar />
      <div className='database-group'>
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