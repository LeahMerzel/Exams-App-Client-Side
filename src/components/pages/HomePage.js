import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/homePage/graphic-design-color-swatches-pens-desk-architectural-drawing-with-work-tools-accessories.jpg';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <img src={backgroundImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
      <Container className="align-items-center mt-5 p-3" style={{ zIndex: 1 }}>
        <h3>Welcome to Leah's Exams App!</h3>
        <p>
          This app is designed for teachers to create exams and for students to take them and get grades.
        </p>
      </Container>
      <Container className="align-items-center p-3" style={{ zIndex: 1 }}>
        <h3>Get Started</h3>
        <p>
          <Button variant="primary" style={{ border: '1px solid #007bff', marginRight: '10px' }} onClick={handleLoginClick}>Login</Button>{' '}
          or{' '}
          <Button variant="primary" style={{ border: '1px solid #007bff', marginLeft: '10px' }} onClick={handleRegisterClick}>Register</Button>.
        </p>
        <p style={{ position: 'absolute', bottom: 60, right: 30 }}>
          Background image by{' '}
          <a href="https://www.freepik.com/free-photo/graphic-design-color-swatches-pens-desk-architectural-drawing-with-work-tools-accessories_1235467.htm#&position=34&from_view=search&track=ais&uuid=62dc3d97-0f07-46e6-a0f4-ca684aef3173">
            ijeab
          </a>{' '}
          on Freepik
        </p>
      </Container>
    </div>
  );
};

export default HomePage;
