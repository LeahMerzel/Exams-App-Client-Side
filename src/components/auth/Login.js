import React, { useState } from 'react';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { login, isLoading } = useUser();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await login(formData);
      if (response) {
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
