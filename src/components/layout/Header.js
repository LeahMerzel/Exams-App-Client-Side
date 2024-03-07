import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import AppNavBar from './AppNavBar'; 
import Logo from '../images/logo/logo.jpg';

const Header = () => {
  return (
    <Navbar bg="light" variant="light" >
    <Container className="d-flex align-items-center">
      <Link to="/" className="mr-auto">
        <img
          alt="Leah's Exams App Logo"
          src={Logo}
          width="150"
          height="150"
          className="d-inline-block align-top"
        />
      </Link>
          <AppNavBar />
        </Container>
      </Navbar>
  );
};

export default Header;
