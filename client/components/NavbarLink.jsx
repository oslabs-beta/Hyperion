import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarLink = (props) => {
  const {
    isActive, 
    icon,
    displayText,
    linkPath, 
    style
  } = props; 


  return (
    <LinkContainer style={style}>
      {icon}  
      {displayText}
      {/* <Link to={linkPath}>{displayText}</Link>  ADD LATER */}
    </LinkContainer>
  )
}


const LinkContainer = styled.div`
  display: flex; 
  font-weight: 600;
  column-gap: 20px;
  justify-content: flex-start; 
  align-items: center;
  height: 2em;
  padding: 1em 2em;
  &:hover {
    background-color: rgb(119, 87, 193);
  }
`;

export default NavbarLink