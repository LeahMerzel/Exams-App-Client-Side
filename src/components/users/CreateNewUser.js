import React from "react";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";
import useCreate from "../hooks/useCreate";

const CreateNewUser = () => {
    const createNewUserApiUrl = "https://localhost:7252/api/User/create";
    const { createEntity, isLoading, error  } = useCreate(createNewUserApiUrl);

    const fields = [
        { name: "userName", label: "Username", type: "text" },
        { name: "password", label: "Password", type: "password" },
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "userRole", label: "User Role", type: "select", options: ['teacher','student']},
    ];

    const handleSubmit = async (formData) => {
          await createEntity(formData);
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
