import React from 'react';
import { Link as LinkScroll } from 'react-scroll';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const HorizontalNavBar = (props) => {

  const navigate = useNavigate();

  return (
    <Navbar 
      bg="light"
      expand="lg"
      className="top-navbar-custom"
    >
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkScroll to="features" smooth={true}>
            <span>Features</span>
          </LinkScroll>
          <LinkScroll to="team" smooth={true}>
          <span>Team</span>
          </LinkScroll>
        </Nav>
          <Form >
            <LinkScroll to="download-title" smooth={true}>
              <Button className="loginButton" onClick={() => navigate('/login')}>Login</Button>
              <Button className="signUpButton" onClick={() => navigate('/register')}>Sign Up</Button>
            </LinkScroll>
          </Form>
      </Navbar.Collapse>
    </Navbar>
)}



export default HorizontalNavBar