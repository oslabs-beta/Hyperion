import React from 'react';
import { Link as LinkScroll } from 'react-scroll';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { logoutUser } from '../../features/user/userSlice';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../features/store';
// import MenuIcon from '@mui/icons-material/Menu';


const HorizontalNavBar = (props) => {
  const navigate = useNavigate();


  const auth = useSelector((state: RootState) => { return state.user.auth })

  return (
    <Box sx={{ flexGrow: 1 }} className='top-navbar-custom'>
      <AppBar position="static" >
        <Toolbar className='top-navbar-custom'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Hyperion
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          { auth.isAuthenticated === true ? 
            <Button color="inherit" onClick={() => { logoutUser() }}>Logout</Button> 
            :
            <Button color="inherit" onClick={() => { navigate('/login')}}>Login</Button>        
          }
          { !auth.isAuthenticated && 
            <Button color="inherit" onClick={() => { navigate('/register')}}>Register</Button> 
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

//Styled Components 



export default HorizontalNavBar