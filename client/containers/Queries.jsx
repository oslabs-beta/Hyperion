import React from 'react'
import NewQueryWindow from '../components/NewQueryWindow';
import QueryCard from '../components/QueryCard';
import styled from 'styled-components';
import Layout from './Layout';

const Queries = () => {
  // redux dispatch/state
  // deleting card skeleton function 
  // adding a query skeleton function
    // validation 
  // adding these functions to event handlers on the buttons 
 
  return (
    <Layout>
      <QueryGroup>
        <QueryCard sqlQuery = 'SELECT * FROM table_name'> </QueryCard>
      </QueryGroup>
      <NewQueryWindow/>
    </Layout>
  )
}

//Dispatch 



// ----------- styled component ---------- // 
const QueryGroup = styled.div`
  background-color: rgb(220, 220 ,220); 
  width: 100%;
  padding: 1em 2em;
  overflow-y: scroll;
`;


export default Queries