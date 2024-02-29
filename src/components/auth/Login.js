import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ userRole }) => {
  const navigate = useNavigate();
  const { login, isLoading } = useUser();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    const formDataWithUserRole = { ...formData, UserRole: userRole };
    try {
      const response = await login(formDataWithUserRole);
      if (response) {
        if (userRole === 0) {
          navigate('/admin-dashboard');
        } else if (userRole === 1) {
          navigate('/teacher-dashboard');
        } else if (userRole === 2) {
          navigate('/student-dashboard');
        } else {
          navigate('/');
        }
        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Login failed. Please try again.');
    }
  };

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
