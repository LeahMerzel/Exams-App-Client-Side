import React, { useState } from 'react';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';

const Login = () => {
  const { login, isLoading } = useUser();
  const [error, setError] = useState(null);

  const fields = [
    { name: 'Email', label: 'Email Address', type: 'email', regex: /^\S+@\S+\.\S+$/, hint: 'Please enter a valid email address.' },
    { name: 'PasswordHash', label: 'Password', type: 'password', regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, hint: 'Password must be at least 8 characters long and contain at least one letter and one number.' },
  ];

  const validateFormData = (formData) => {
    for (const field of fields) {
      const { name, regex } = field;
      if (regex && formData[name] && !regex.test(formData[name])) {
        setError(`Invalid input for ${field.label}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (formData) => {
    const isValid = validateFormData(formData);
  
    if (!isValid) {
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message || 'Login failed. Please try again.');
    }    
  };

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