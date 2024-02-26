import React, { useState } from "react";
import useCreate from "../hooks/useCreate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";

const CreateNewUser = () => {
    const createUserApiUrl = "https://localhost:7252/api/Auth/register";
    const { createEntity, isLoading, error } = useCreate(createUserApiUrl);
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

    const onSubmit = async (formData) => {
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });
        formDataWithImage.append("image", imageFile);
        await createEntity(formDataWithImage);
        setImageFile(null);
    };


    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"User"}/>
        </div>
    );
};
  
export default CreateNewUser;
