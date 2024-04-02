import React from "react";
import Form from "../forms/Form";
import { Spinner, Alert, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import { useNavigate } from "react-router-dom";

const CreateNewUser = () => {
    const createNewUserApiUrl = "https://localhost:7252/api/User/create";
    const { createEntity, isLoading, error  } = useCreate(createNewUserApiUrl);
    const navigate = useNavigate();

    const fields = [
        { name: 'UserName', label: 'Username', type: 'text', regex: /^[a-zA-Z0-9_]+$/ },
        { name: 'FullName', label: 'Full Name', type: 'text' },
        { name: 'Email', label: 'Email Address', type: 'email' },
        { name: 'PasswordHash', label: 'Password', type: 'password', regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ },
        { name: 'UserRole', label: 'User Role', type: 'select', options: ['Please select a user role', 'Teacher', 'Student'] }
        ];

    const handleSubmit = async (formData) => {
          await createEntity(formData);
      };

    const handleGoBack = () => {
        navigate("/admin-dashboard");
      };

    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={handleSubmit} entityName={"NewUser"}/>
            <Button variant="link" onClick={handleGoBack} className="mr-2">Go Back</Button>
        </div>
    );
};
  
export default CreateNewUser;
