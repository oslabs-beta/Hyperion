import  * as React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import styled from 'styled-components';
/**
 * 
 * wrapper component for defining the layout of our container components 
 */
const Layout = (props: any) => {
  return (
    <StyledLayout className={props.className}>
      <VerticalNavbar />
      <Container>
        {props.children}
      </Container>
    </StyledLayout>
  )
}

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row; 
  height: 100%; 
  justify-content: space-between;
   
`;

const Container = styled.div`
  // flex-grow: 1; 
`;

export default Layout