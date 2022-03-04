import React from 'react';
import { Link as LinkScroll } from 'react-scroll';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const HorizontalNavBar = () => {
  return (
    <Navbar 
    bg="light"
    expand="lg"
    className="top-navbar-custom"
    >
    <Navbar.Brand>Hyperion</Navbar.Brand>
    {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
          <LinkScroll to="features" smooth={true}>
            <span>Features </span>
          </LinkScroll>
          <LinkScroll to="community" smooth={true}>
          <span> Community </span>
          </LinkScroll>
          <LinkScroll to="team" smooth={true}>
          <span> Team </span>
          </LinkScroll>
          
        </Nav>
        <Form >
          <LinkScroll to="download-title" smooth={true}>
            <Button className="loginButton">Login</Button>
            <Button className="signUpButton">Sign Up</Button>
          </LinkScroll>
        </Form>
        </Navbar.Collapse>
  </Navbar>
    )}

//Styled Components 



export default HorizontalNavBar