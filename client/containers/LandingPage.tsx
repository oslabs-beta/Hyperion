import React from 'react';
import HorizontalNavBar from '../components/LandingPageComponents/HorizontalNavBar';
import Team from '../components/LandingPageComponents/Team';
import Info from '../components/LandingPageComponents/Info';
import Features from '../components/LandingPageComponents/Features';
import Footer from '../components/LandingPageComponents/Footer';

const LandingPage = (props) => {
  return (
    <div className='landing-container'>
      <HorizontalNavBar></HorizontalNavBar>
      <Info></Info>
      <Features></Features>
      <Team></Team>
      <Footer/>
    </div>
  )
}

export default LandingPage