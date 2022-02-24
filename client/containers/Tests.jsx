import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import TestConfigWindow from '../components/TestConfigWindow';
import { connect } from "react-redux";
import LineGraph from '../components/LineGraph';


const Tests = () => { 
  const [image, setImage] = useState(null); // should image be a component? 

  const runTest = () => {
    //d3 logic goes here 
    // get the image from d3
    /*
    example data!!!
    */


    setImage(true)
  }

  return (
    <Layout>
      <h4>Tests</h4>
      <StyledContainer>
        {/* {image} */}
        <LineGraph />
        <TestConfigWindow />
      </StyledContainer>
    </Layout>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%; 
  justify-content: right;
`;


const mapStateToProps = (state) =>({
  queryStore: store.app.queryStore
});


connect(mapStateToProps)(Tests);
export default Tests;