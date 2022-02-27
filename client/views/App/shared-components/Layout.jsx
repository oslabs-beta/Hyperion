import React from 'react';
import VerticalNavbar from '../../../components/VerticalNavbar';
import styled from 'styled-components';
/**
 * 
 * wrapper component for defining the layout of our container components 
 */
const Layout = (props) => {
  return (
    <StyledLayout className={props.className}>
      <VerticalNavbar />
      {props.children}
    </StyledLayout>
  )
}

const StyledLayout = styled.div`
  display: flex;
  flex-direction: row; 
  height: 100%; 
  justify-content: space-between; 
`;

export default Layout