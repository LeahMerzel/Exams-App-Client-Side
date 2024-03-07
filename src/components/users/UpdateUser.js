import React, { useState } from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateUser = (userId) => {
  const updateUserApiUrl = `https://localhost:7252/api/Auth/updateUser`;
  const { updateEntity, isLoading, error } = useUpdate(updateUserApiUrl);

  const fields = [
    { name: "userName", label: "Username", type: "text"},
    { name: "password", label: "New Password", type: "password"},
    { name: "fullName", label: "Full Name", type: "text"},
    { name: "email", label: "Email Address", type: "email" }
  ];

  const onSubmit = async (formData) => {
    formData.id = userId;
    try {
        const response = await updateEntity(formData);
        if (response ) {
          toast.success('Update successful!');
        }
      } catch (error) {
        console.error('Update failed:', error.message);
        toast.error('Update failed. Please try again.');
      }
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Form fields={fields} onSubmit={onSubmit} entityName={"Update"} />
    </div>
  );
};

export default UpdateUser;

