import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useUser();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await login(formData);
      const { role } = user;
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher-dashboard');
      } else if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        // Default redirect if role is not specified
        navigate('/');
      }
      // Show success message
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Login failed. Please try again.');
    }
  };

  const fields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'password', label: 'Password', type: 'password' }
  ];

  return (
    <div>
      <Container className="align-items-center mt-3 mb-5 p-3">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form fields={fields} onSubmit={handleSubmit} entityName="Login" />
        <p>
          Don't have an account? {' '}
          <Link to="/register">Register Here</Link>      
        </p>
      </Container>
    </div>
  );
};

export default Login;
