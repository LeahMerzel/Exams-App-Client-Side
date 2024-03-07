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
    { name: 'Password', label: 'Password', type: 'password' },
     { name: 'userRole', label: 'User Role', type: 'text' }
   // { name: "ProfileImagePath", label: "Upload Image", type: "file" },
  ];

  // // const fields = [
  // //   { name: 'UserName', label: 'Username', type: 'text', regex: /^[a-zA-Z0-9_]+$/ },
  // //   { name: 'FullName', label: 'Full Name', type: 'text' },
  // //   { name: 'Email', label: 'Email Address', type: 'email' },
  // //   { name: 'PasswordHash', label: 'Password', type: 'password', regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ },
  // //   // Add regex pattern for password validation (at least 8 characters, one letter, and one number)
  // //   // { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
  // //   { name: "ProfileImagePath", label: "Upload Image", type: "file" },
  // // ];
  // const handleSubmit = async (formData) => {
  //   const formDataWithUserRole = { ...formData, UserRole: userRole };
  //   // const formDataWithImage = new FormData();
  //   // Object.entries(formData).forEach(([key, value]) => {
  //   //   formDataWithImage.append(key, value);
  //   // });
  //   // formDataWithImage.append("image", imageFile);
  //   try {
  //     // Validate form data
  //     const isValid = validateFormData(formData);
  //     if (!isValid) return;

  //     const response = await register(formDataWithUserRole);
  //     setImageFile(null);
  //     if (response ) {
  //       toast.success('Registration successful!');
  //     }
  //   } catch (error) {
  //     console.error('Registration failed:', error.message);
  //     setError('Registration failed. Please try again.');
  //     toast.error('Registration failed. Please try again.');
  //   }
  // };

  // const validateFormData = (formData) => {
  //   for (const field of fields) {
  //     const { name, regex } = field;
  //     if (regex && formData[name] && !regex.test(formData[name])) {
  //       setError(`Invalid input for ${field.label}`);
  //       return false;
  //     }
  //   }
  //   return true;
  // };

  const handleSubmit = async (formData) => {
    // const formDataWithImage = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   formDataWithImage.append(key, value);
    // });
    // formDataWithImage.append("image", imageFile);
    try {
      const response = await register(formData);
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