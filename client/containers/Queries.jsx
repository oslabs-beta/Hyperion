import React from 'react'
import VerticalNavbar from '../components/VerticalNavbar';
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled from 'styled-components';


const Queries = () => {
  // redux dispatch/state
  // deleting card skeleton function 
  // adding a query skeleton function
    // validation 
  // adding these functions to event handlers on the buttons 
 
  return (
    <StyledContainer>
      <VerticalNavbar />
      <div className='query-group'>
      <QueryCard sqlQuery = 'SELECT * FROM table_name'> </QueryCard>
      </div>
      <NewQueryWindow/>
    </StyledContainer>
  )
}

//Dispatch 


// ----------- styled component ---------- // 
const StyledContainer = styled.div`
  display: flex;
  flex-direction: row; 
  height: 100%; 
  width: 100%;
  justify-content: space-between; 

  .query-group {
    background-color: rgb(220, 220 ,220); 
    width: 100%;
    padding: 1em 2em;
    overflow-y: scroll;
  }

`;

export default Queries