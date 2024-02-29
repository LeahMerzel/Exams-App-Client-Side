import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const GetStarted = ({ userRole }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  return (
    <Container className="align-items-center p-3">
      <h3>Get Started</h3>
      {!showLogin && !showRegister && (
        <p>
        <br/>
          <Button variant="primary" style={{ border: '1px solid #007bff', marginRight: '10px' }} onClick={handleLoginClick}>Login</Button>{' '}
          or{' '}
          <Button variant="primary" style={{ border: '1px solid #007bff', marginLeft: '10px' }} onClick={handleRegisterClick}>Register</Button>.
        </p>
      )}
      {showLogin && <Login userRole={userRole} />}
      {showRegister && <Register userRole={userRole} />}
    </Container>
  );
};

export default GetStarted;
