import React, { useState } from 'react';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { register, isLoading} = useUser();
  const [error, setError] = useState(null);

  const fields = [
    { name: 'UserName', label: 'Username', type: 'text', regex: /^[a-zA-Z0-9_]+$/ },
    { name: 'FullName', label: 'Full Name', type: 'text' },
    { name: 'Email', label: 'Email Address', type: 'email' },
    { name: 'PasswordHash', label: 'Password', type: 'password', regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ },
    { name: 'UserRole', label: 'User Role', type: 'select', options: ['Admin', 'Teacher', 'Student'] }
  ];

  const handleSubmit = async (formData) => {
    try {
      const response = await register(formData);
      if (response ) {
        toast.success('Registration successful!');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    }
  };

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

  return (
    <div>
      <Container className="align-items-center">
        {isLoading && <Spinner animation="border" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form fields={fields} onSubmit={handleSubmit} entityName="Register" validateFormData={validateFormData} />
      </Container>
    </div>
  );
};

export default Register;
