import React, { useState } from 'react';
import { useUser } from './UserContext';
import Form from '../forms/Form';
import { Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const { userRole, register, isLoading} = useUser();
  console.log(userRole);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const fields = [
    { name: 'UserName', label: 'Username', type: 'text' },
    { name: 'FullName', label: 'Full Name', type: 'text' },
    { name: 'Email', label: 'Email Address', type: 'email' },
    { name: 'PasswordHash', label: 'Password', type: 'password' },
    // { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
    { name: "ProfileImagePath", label: "Upload Image", type: "file" },
  ];

  const handleSubmit = async (formData) => {
    const formDataWithUserRole = { ...formData, UserRole: userRole };
    // const formDataWithImage = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataWithImage.append(key, value);
    // });
    // formDataWithImage.append("image", imageFile);
    try {
      const response = await register(formDataWithUserRole);
      setImageFile(null);
      if (response ) {
        toast.success('Registration successful!');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError('Registration failed. Please try again.');
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Container className="align-items-center">
        {isLoading && <Spinner animation="border" />}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form fields={fields} onSubmit={handleSubmit} entityName="Register" />
      </Container>
    </div>
  );
};

export default Register;
