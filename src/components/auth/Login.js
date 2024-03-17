import React, { useState } from 'react';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, isLoading, userRole } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await login(formData);
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message || 'Login failed. Please try again.');
    }    
  };

  if (userRole) {
    console.log("userRole", userRole)
    switch (userRole) {
      case "Admin":
        navigate("/admin-dashboard");
        break;
      case "Teacher":
        navigate("/teacher-dashboard");
        break;
      case "Student":
        navigate("/student-dashboard");
        break;
      default:
        navigate('/');
        break;
    }
  }

  const fields = [
    { name: 'Email', label: 'Email', type: 'email' },
    { name: 'PasswordHash', label: 'Password', type: 'password' },
  ];

  return (
    <div>
      <Container className="align-items-center">
        {isLoading && <Spinner animation="border" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form fields={fields} onSubmit={handleSubmit} entityName="Login" />
      </Container>
    </div>
  );
};

export default Login;