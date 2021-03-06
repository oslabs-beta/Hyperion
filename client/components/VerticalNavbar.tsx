import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MdOutlineSpaceDashboard, MdOutlineSchema, MdQueryBuilder, MdOutlineSpeed } from 'react-icons/md';
import { FiDatabase } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { payload } : any = await dispatch(logoutUser());
    const isSuccess : boolean = payload; 

    // on success, redirect to login page 
    if (isSuccess === true) { window.location.href = '/login' }
    else { 
      alert('User could not be logged out');
    }
  }

  return (
    <div className='vertical-navbar'>
      <div className='header'>Hyperion</div>
      <div className='app-links-group'>
        <div className='space'> 
        <NavbarLink icon={ICONS.dashboard} displayText='Home' linkPath='/dashboard'/> 
        </div>
        <div className='space'>
        <NavbarLink icon={ICONS.database} displayText='Databases' linkPath='/database'/> 
        </div>
        <div className='space'>
        <NavbarLink icon={ICONS.queries} displayText='Queries' linkPath='/queries'/> 
        </div>
        <div className='space'>
        <NavbarLink icon={ICONS.tests} displayText='Run Tests' linkPath='/tests'/> 
        </div>
      </div>
      <ul className='user-links-group'>
        <div className='space'>
        <li><div onClick={() => { navigate('/')}}>Landing</div></li>
        </div>
        <div className='space'>
        <li><div onClick={handleLogout}>Logout</div></li>
        </div>
        <div className='space'>
        <li><div onClick={() => { navigate('/')}}>About</div></li>
        </div>
      </ul>
    </div>
  )
}



export default VerticalNavbar