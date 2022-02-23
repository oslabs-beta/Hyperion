import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import TestConfigWindow from '../components/TestConfigWindow';


const Tests = () => {
  return (
    <Layout>
      <h4>Tests</h4>
      <StyledContainer>
        
        <TestConfigWindow />
      </StyledContainer>
    </Layout>

  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%; 
`;


export default Tests