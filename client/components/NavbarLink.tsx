import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { flexbox } from '@mui/system';
import { rows } from 'pg/lib/defaults';

const NavbarLink = (props) => {
  const {
    icon,
    displayText,
    linkPath, 
    style
  } = props; 

  return (
    <LinkContainer style={style}>
      {icon}
      <Link className='link' to={linkPath}>{displayText}</Link> 
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

  .link {
    text-decoration: none; 
    color: inherit; 
  }
`;

export default NavbarLink