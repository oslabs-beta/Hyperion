import React from 'react';
import Layout from './Layout';
import Login from '../components/Login';
import { Outlet } from 'react-router-dom';
import HorizontalNavBar from '../components/LandingPageComponents/HorizontalNavBar';
import Team from '../components/LandingPageComponents/Team';
import Info from '../components/LandingPageComponents/Info';
import Features from '../components/LandingPageComponents/Features';

const Dashboard = (props) => {
  return (
    <Layout>
      <div className='dashboard-container'>
        <div className='dashboard-content'>
          HYPERION
        </div> 
      </div>
    </Layout>
  )
}

export default Dashboard