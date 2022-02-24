import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import TestConfigWindow from '../components/TestConfigWindow';
import { connect } from "react-redux";


const Tests = () => { 
  const [image, setImage] = useState(null); // should image be a component? 

  const runTest = () => {
    //d3 logic goes here 
    // get the image from d3
    /*
    example data!!!
    */
    const data = []
    for (let i = 0; i < 10; i++) {
      data.push({ x: i, y: i ** 2 })
    }

    setImage()
  }

  return (
    <Layout>
      <h4>Tests</h4>
      <StyledContainer>
        {image}
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


const mapStateToProps = (state) =>({
  queryStore: store.app.queryStore
});


connect(mapStateToProps)(Tests);
export default Tests;