import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({userRole}) => {
  const navigate = useNavigate();
  const { register, isLoading } = useUser();
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fields = [
    { name: 'UserName', label: 'Username', type: 'text' },
    { name: 'FullName', label: 'Full Name', type: 'text' },
    { name: 'PasswordHash', label: 'Password', type: 'password' },
    { name: 'Email', label: 'Email Address', type: 'email' },
    // { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
    { name: "ProfileImagePath", label: "Upload Image", type: "file" },
    { name: 'UserRole', type: 'hidden', value: userRole }
  ];

  const handleSubmit = async (formData) => {
    // const formDataWithImage = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataWithImage.append(key, value);
    // });
    // formDataWithImage.append("image", imageFile);
    try {
      const response = await register(formData);
      setImageFile(null);
      if (response.userLoggedIn) {
        if (userRole === 0) {
          navigate('/admin-dashboard');
        } else if (userRole === 1) {
          navigate('/teacher-dashboard');
        } else if (userRole === 2) {
          navigate('/student-dashboard');
        } else {
          navigate('/');
        }
          toast.success('Registration successful!');
      } else {
        setError('Registration failed. Please try again.');
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Container className="align-items-center mt-0 mb-5 p-3">
        {isLoading && <Spinner animation="border" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form fields={fields} onSubmit={handleSubmit} entityName="Register" />
        <p>
          Already have an account? {' '}
          <Link to="/login">Login Here</Link>
        </p>
      </Container>
    </div>
  );
};

export default Register;
