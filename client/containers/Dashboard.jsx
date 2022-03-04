import React from 'react';
import HorizontalNavBar from '../components/LandingPageComponents/HorizontalNavBar';
import Team from '../components/LandingPageComponents/Team';
import Info from '../components/LandingPageComponents/Info';
// import SignUpForm from '../components/SignUpForm';

const Dashboard = () => {
  return (
      <div>
      <HorizontalNavBar></HorizontalNavBar>
      <Info></Info>
      <Team></Team>
      </div> 
  )
}

export default Dashboard