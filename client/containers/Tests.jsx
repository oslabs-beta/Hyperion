import React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import styled from 'styled-components';
import Layout from './Layout';

const Tests = () => {
  return (
    <Layout>
      <div>Tests</div>

    </Layout>

  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%; 
`;


export default Tests