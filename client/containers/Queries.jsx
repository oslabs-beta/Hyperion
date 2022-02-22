import React from 'react'
import VerticalNavbar from '../components/VerticalNavbar';
import styled from 'styled-components';

const Queries = () => {
  return (
    <StyledContainer>
      <VerticalNavbar />
      <div className='query-group'>
      </div>
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

  .query-group {
    background-color: rgb(220, 220 ,220); 
    width: 100%;
    padding: 1em 2em;
    overflow-y: scroll;
  }

`;

export default Queries