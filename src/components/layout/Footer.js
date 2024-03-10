import React from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../images/logo/logo.jpg';

const Footer = () => {
  return (
    <Navbar bg="light" variant="light" >
      <Container>
        <Col className="d-flex align-items-center justify-content-between">
          <Link to="/" className="mr-auto">
            <img
              alt="Leah's Exams App Logo"
              src={Logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
            />
          </Link>
          <Navbar.Text className="ml-auto" style={{ paddingLeft: '15px' }}>
            © {new Date().getFullYear()} Leah's Exams App |
            <span className="fw-bold"> Contact:</span> leahwalden4@gmail.com | <span className="fw-bold">Phone #</span> 0527194137
          </Navbar.Text>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Footer;
