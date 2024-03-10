import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/homePage/graphic-design-color-swatches-pens-desk-architectural-drawing-with-work-tools-accessories.jpg';
import { useUser } from '../auth/UserContext';

const HomePage = () => {
  const { userRole } = useUser();
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    if (userRole === "Teacher" || userRole === null) {
      navigate('/teacher-home');
    } else {
      alert("You are not a teacher.");
    }
  };

  const handleStudentClick = () => {
    if (userRole === "Student" || userRole === null) {
      navigate('/student-home');
    } else {
      alert("You are not a student.");
    }
  };

  const handleAdminClick = () => {
    if (userRole === "Admin" || userRole === null) {
      navigate('/admin-home');
    } else {
      alert("You are not the admin.");
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <img src={backgroundImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
      <Container className="p-3" style={{ zIndex: 1 }}>
        <div className="text-left">
          <h3>Welcome to Leah's Exams App!</h3>
          <p>This app is designed for teachers to create exams and for students to take them and get grades.</p>
        </div>
        <div className="text-center mt-3 d-md-none">
          <h3>Get Started</h3>
          <p>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleTeacherClick}>I'm a Teacher</Button>
          </p>
          <p>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleStudentClick}>I'm a Student</Button>
          </p>
          <p>
            <Button variant="primary" onClick={handleAdminClick}>I'm the Admin</Button>
          </p>
        </div>
        <div className="text-left mt-3 d-none d-md-block">
          <h3>Get Started</h3>
          <p>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleTeacherClick}>I'm a Teacher</Button>
            <Button variant="primary" style={{ marginRight: '10px' }} onClick={handleStudentClick}>I'm a Student</Button>
            <Button variant="primary" onClick={handleAdminClick}>I'm the Admin</Button>
          </p>
        </div>
        <div className="text-right ">
          <p style={{ marginBottom: 0 }}>
            Background image by{' '}
            <a href="https://www.freepik.com/free-photo/graphic-design-color-swatches-pens-desk-architectural-drawing-with-work-tools-accessories_1235467.htm#&position=34&from_view=search&track=ais&uuid=62dc3d97-0f07-46e6-a0f4-ca684aef3173">
              ijeab
            </a>{' '}
            on Freepik
          </p>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
