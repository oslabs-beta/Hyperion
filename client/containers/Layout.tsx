import  * as React from 'react';
import VerticalNavbar from '../components/VerticalNavbar';
import styled from 'styled-components';
/**
 * 
 * wrapper component for defining the layout of our container components 
 */
const Layout = (props: any) => {
  return (
    <div className='app-layout'>
      <VerticalNavbar />
      <div className='app-container'>
        <div className='app-content'>
          {props.children}
        </div>
      </div>
    </div>
  )
}



export default Layout