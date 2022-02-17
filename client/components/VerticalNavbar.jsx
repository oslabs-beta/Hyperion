import React from 'react';
import styled from 'styled-components';
import { MdOutlineSpaceDashboard, MdOutlineSchema, MdQueryBuilder, MdOutlineSpeed } from 'react-icons/md';
import { FiDatabase } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import { icons } from 'react-icons/lib';

// -------------- constants -------------// 
const NAV_ICON_SIZE = 22; 
const ICONS = {
  dashboard: <MdOutlineSpaceDashboard size={NAV_ICON_SIZE}/>,
  database: <FiDatabase size={NAV_ICON_SIZE}/>, 
  schema: <MdOutlineSchema size={NAV_ICON_SIZE}/>,
  queries: <MdQueryBuilder size={NAV_ICON_SIZE}/>,
  tests: <MdOutlineSpeed size={NAV_ICON_SIZE}/>
}

// -------------- main component -------// 
const VerticalNavbar = (props) => {
  return (
    <StyledContainer>
      <div className='header-logo'>Hyperion</div>
      <div className='navbar-app-links'>
        <NavbarLink icon={ICONS.dashboard} displayText='Dashboard' linkPath='/dashboard'/> 
        <NavbarLink icon={ICONS.database} displayText='Databases' linkPath='/databases'/> 
        <NavbarLink icon={ICONS.schema} displayText='Schema' linkPath='/schema'/> 
        <NavbarLink icon={ICONS.queries} displayText='Queries' linkPath='/queries'/> 
        <NavbarLink icon={ICONS.tests} displayText='Run Tests' linkPath='/test'/> 
      </div>

      {/* TODO make these into working links  */}
      <ul className='user-links'>
        <li>Home</li>
        <li>Settings</li>
        <li>Login</li>
        <li>Sign Up</li>
      </ul>
      
    </StyledContainer>
  )
}




// ------------ component styling ----------// 
const StyledContainer = styled.div`
  background-color: rgb(60, 44, 83);
  color: rgb(240, 242, 243);
  display: flex; 
  height: 100%; 
  align-items: center; 
  justify-content: space-around; 
  flex-direction: column; 
  border-right: 1.5px solid grey; 

  // padding: 1em 2em;

  .header-logo {
    font-size: 1.5em; 
    font-weight: 600;
  }

  ul {
    padding: 0;
    list-style-type: none;
    
  }
  .user-links {
    font-size: 10pt;
  }
  
`;


export default VerticalNavbar