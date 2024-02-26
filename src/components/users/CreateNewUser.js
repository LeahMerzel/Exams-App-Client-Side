import React, { useState } from "react";
import { useUser } from '../auth/UserContext';
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewUser = () => {
    const { register, isLoading } = useUser();
    const [error, setError] = useState(null);
    const [imageFile, setImageFile] = useState(null);
  
    const fields = [
        { name: "userName", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "phoneNumber", label: "Phone Number", type: "text" },
        { name: "userRole", label: "User Role", type: "select", options: ['teacher','student']},
        { name: "image", label: "Upload Image", type: "file" } 
    ];

    const handleSubmit = async (formData) => {
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataWithImage.append(key, value);
        });
        formDataWithImage.append("image", imageFile);
        try {
          const response = await register(formDataWithImage);
          setImageFile(null);
          if (response.userLoggedIn) {
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
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={handleSubmit} entityName={"NewUser"}/>
        </div>
    );
};
  
export default CreateNewUser;
