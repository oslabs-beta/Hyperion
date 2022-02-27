import * as React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import styled from 'styled-components';
import Layout from './Layout';

const exampleDatabaseList = ['database1', 'database2', 'database3'];

const DataModels = (props) => {
  return (
    <Layout>
      <Container>
        <div> 
          <select>  
            {exampleDatabaseList.map((item) => {
              return <option value={item}>{item}</option>
            })}
          </select>
        </div>
        <div></div>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  display: flex; 
  flex-direction: colum; 
  
`;


export default DataModels