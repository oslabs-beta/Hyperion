import React from 'react';
import { Link as LinkScroll } from 'react-scroll';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HorizontalNavBar = () => {
  const navigate = useNavigate();

  return (
    <Navbar 
    bg="light"
    expand="lg"
    className="top-navbar-custom"
    >
    <Navbar.Brand className="brand">Hyperion</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
          <LinkScroll to="features" smooth={true}>
            Features 
          </LinkScroll>
          <LinkScroll to="team" smooth={true}>
            Team 
          </LinkScroll>
        </Nav>
        <Form >
            <Button className="loginButton" onClick={() => { navigate('/login')} }>Login</Button>
            <Button className="signUpButton" onClick={() => { navigate('/register')} }>Sign Up</Button>
        </Form>
        </Navbar.Collapse>
  </Navbar>
    )}

//Styled Components 



export default HorizontalNavBar