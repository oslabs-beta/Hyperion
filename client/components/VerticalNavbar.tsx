import React from 'react';
import styled from 'styled-components';
import { MdOutlineSpaceDashboard, MdOutlineSchema, MdQueryBuilder, MdOutlineSpeed } from 'react-icons/md';
import { FiDatabase } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import NavbarLink from './NavbarLink';
import { icons } from 'react-icons/lib';
import { logoutUser } from '../features/user/userSlice';

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
    <div className='vertical-navbar'>
      <div className='header'>Hyperion</div>
      <div className='app-links-group'>
        <NavbarLink icon={ICONS.dashboard} displayText='Dashboard' linkPath='/dashboard'/> 
        <NavbarLink icon={ICONS.database} displayText='Databases' linkPath='/database'/> 
        <NavbarLink icon={ICONS.queries} displayText='Queries' linkPath='/queries'/> 
        <NavbarLink icon={ICONS.tests} displayText='Run Tests' linkPath='/tests'/> 
      </div>

      {/* TODO make these into working links  */}
      <ul className='user-links-group'>
        <Link to='/'>Home</Link>
        <li onClick={logoutUser} ><div>Logout</div></li>
        <Link to='/about'>About</Link>
      </ul>
    </div>
  )
}



export default VerticalNavbar