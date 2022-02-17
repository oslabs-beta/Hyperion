import React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import NewDatabaseWindow from '../components/NewDatabaseWindow';
import styled from 'styled-components';
import DatabaseCard from '../components/DatabaseCard';

const Databases = (props) => {
  return (
    <StyledContainer>
      <VerticalNavbar />
      <div className='database-group'>
        <h4>My Databases</h4>
        {/* example */}
        <DatabaseCard database='db1.aws.com' port={5432} user='postgres' ssl='Required'></DatabaseCard>


      </div>
      <NewDatabaseWindow />
    </StyledContainer>
  )
}


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
  }

`;

export default Databases