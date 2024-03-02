import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import Login from './Login';
import Register from './Register';

const GetStarted = () => {
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

  const handleGoBack = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <Container className="align-items-center p-3">
      <h3>Get Started</h3>
      <br/>
      {!showLogin && !showRegister && (
        <p>
          <Button variant="primary" style={{ border: '1px solid #007bff', marginRight: '10px' }} onClick={handleLoginClick}>Login</Button>{' '}
          or{' '}
          <Button variant="primary" style={{ border: '1px solid #007bff', marginLeft: '10px' }} onClick={handleRegisterClick}>Register</Button>.
        </p>
      )}
      {showLogin && <Login />}
      {showRegister && <Register />}
      {(showLogin || showRegister) && (
        <p className=' mt-2 mb-5'>
          <Button variant="link" onClick={handleGoBack}>Go back</Button>
        </p>
      )}
    </Container>
  );
};

export default GetStarted;
