import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useUser } from '../auth/UserContext';

const AppNavBar = () => {
  const { userRole } = useUser();

  return (
    <Navbar >
        <Navbar.Brand as={Link} to="/">Leah's Exams App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {userRole === 0 && (
            <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
            )}
            {userRole === 1 && (
            <Nav.Link as={Link} to="/teacher-dashboard">Teacher Dashboard</Nav.Link>
            )}
            {userRole === 2 && (
            <Nav.Link as={Link} to="/student-dashboard">Student Dashboard</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavBar;
