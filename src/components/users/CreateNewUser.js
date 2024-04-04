import React, {useState} from "react";
import Form from "../forms/Form";
import { Spinner, Alert, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import { useNavigate } from "react-router-dom";

const CreateNewUser = () => {
    const createNewUserApiUrl = "https://localhost:7252/api/User/create";
    const { createEntity, isLoading, error  } = useCreate(createNewUserApiUrl);
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    const fields = [
        { name: 'UserName', label: 'Username', type: 'text', required: true },
        { name: 'FullName', label: 'Full Name', type: 'text', required: true },
        { name: 'Email', label: 'Email Address', type: 'email', required: true },
        { name: 'PasswordHash', label: 'Password', type: 'password', required: true },
        { name: 'UserRole', label: 'User Role', type: 'select', options: ['Please select a user role', 'Teacher', 'Student'], required: true }
        ];

    const handleSubmit = async (formData) => {
        const requiredFields = fields.filter(field => field.required);
        const missingFields = requiredFields.filter(field => !formData[field.name]);
        if (missingFields.length > 0) {
          const errors = {};
          missingFields.forEach(field => {
            errors[field.name] = `${field.label} is required`;
          });
          setValidationErrors(errors);
          return;
        }
          await createEntity(formData);
      };

    const handleGoBack = () => {
        navigate("/admin-dashboard");
      };

    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={handleSubmit} entityName={"NewUser"} validationErrors={validationErrors}/>
            <Button variant="link" onClick={handleGoBack} className="mr-2">Go Back</Button>
        </div>
    );
};
  
export default CreateNewUser;
