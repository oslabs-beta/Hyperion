import React from 'react';
import Layout from './Layout';
import Login from '../components/Login';
import { Outlet } from 'react-router-dom';
import HorizontalNavBar from '../components/LandingPageComponents/HorizontalNavBar';
import Team from '../components/LandingPageComponents/Team';
import Info from '../components/LandingPageComponents/Info';
import Features from '../components/LandingPageComponents/Features';
import logo from '../assets/images/IconLogo.png'

const Dashboard = (props) => {
  return (
    <Layout>
      <div className='dashboard-container'>
        <div className='dashboard-content'>
          <img src={logo}  />
        </div> 
      </div>
    </Layout>
  )
}

export default Dashboard