// AppNavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useUser } from '../auth/UserContext';

const AppNavBar = () => {
  const { userRole } = useUser();

  return (
    <Nav className="me-auto">
    <Navbar.Brand as={Link} to="/">Leah's Exams App</Navbar.Brand>
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/about">About</Nav.Link>
      <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
      {userRole === "Admin" && (
        <Nav.Link as={Link} to="/admin-dashboard">Admin Dashboard</Nav.Link>
      )}
      {userRole === "Teacher" && (
        <Nav.Link as={Link} to="/teacher-dashboard">Teacher Dashboard</Nav.Link>
      )}
      {userRole === "Student" && (
        <Nav.Link as={Link} to="/student-dashboard">Student Dashboard</Nav.Link>
      )}
    </Nav>
  );
};

export default AppNavBar;
