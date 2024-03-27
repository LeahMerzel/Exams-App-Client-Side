import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppNavBar from './AppNavBar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from '../images/logo/logo.jpg';
import { useUser } from '../auth/UserContext';

const Header = () => {
  const { userLoggedIn, logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-lg-none"> {/* Hide logo on desktop */}
          <img
            alt="Leah's Exams App Logo"
            src={Logo}
            width="150"
            height="150"
            className="d-inline-block align-top"
            style={{ marginRight: 'auto', marginLeft: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <AppNavBar />
          </Nav>
          {userLoggedIn ? (
            <Link to="/" onClick={handleLogout} style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}>
              <FontAwesomeIcon icon={faUser} size="2x" style={{ marginBottom: '5px', display: 'block' }} />
              <span style={{ marginRight: '20px' }}>Logout</span>
            </Link>
          ) : (
            <Link to="/get-started" style={{ textDecoration: 'none', color: 'black', textAlign: 'center' }}>
              <FontAwesomeIcon icon={faUser} size="2x" style={{ marginBottom: '5px', display: 'block' }} />
              <span style={{ marginRight: '20px' }}>Login</span>
            </Link>
          )}
        </Navbar.Collapse>
        <Navbar.Brand as={Link} to="/" className="d-none d-lg-block"> {/* Hide logo on mobile */}
          <img
            alt="Leah's Exams App Logo"
            src={Logo}
            width="150"
            height="150"
            className="d-inline-block align-top"
            style={{ marginRight: 'auto', marginLeft: 'auto' }}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
