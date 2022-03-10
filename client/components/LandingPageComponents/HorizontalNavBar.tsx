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
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../features/store';
// import MenuIcon from '@mui/icons-material/Menu';


const HorizontalNavBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => { return state.user.auth })

  const handleLogout = async () => {
    const { payload } : any = await dispatch(logoutUser());
    const isSuccess : boolean = payload; 

    // on success, redirect to login page 
    if (isSuccess === true) { window.location.href = '/' }
    else { 
      // TODO: handle call failures to 
      alert('User could not be logged out');
    }
  }


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
          <div className ='landing-logo'>
            Hyperion
          </div>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          { auth.isAuthenticated === true ? 
            <Button color="inherit" onClick={handleLogout}>
              <div className='nav-buttons'>
                Logout
              </div>
              </Button> 
            :
            <Button color="inherit" onClick={() => { navigate('/login')}}>
              <div className='nav-buttons'>
                Login
              </div>
              </Button>        
          }
          { !auth.isAuthenticated && 
            <Button color="inherit" onClick={() => { navigate('/register')}}>
              <div className='nav-buttons'>       
                Register
              </div>
              </Button> 
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}



export default HorizontalNavBar