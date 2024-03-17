import React, { useState } from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateUser = ({ userToUpdate, onFormClose, userId }) => {
  const updateUserApiUrl = `https://localhost:7252/api/Auth/update`;
  const { updateEntity, isLoading, error } = useUpdate(updateUserApiUrl);
  const [showForm, setShowForm] = useState(true); // State to control the visibility of the update form

  const fields = [
    { name: "userName", label: "Username", type: "text"},
    { name: "passwordHash", label: "New Password", type: "password"},
    { name: "fullName", label: "Full Name", type: "text"},
    { name: "email", label: "Email Address", type: "email" }
  ];

  const onSubmit = async (formData) => {
    formData.id = userId? userId :userToUpdate.id;
    if (!formData.passwordHash) {
      formData.passwordHash = userToUpdate.passwordHash;
    }    
    try {
      const response = await updateEntity(formData);
      if (response) {
        toast.success('Update successful!');
        setShowForm(false); // Close the update form
        onFormClose(); // Callback to indicate that the form is closed
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };

  return (
    <div>
      {showForm && (
        <>
          {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          <Form fields={fields} onSubmit={onSubmit} entityName={"Update"} />
        </>
      )}
      {!showForm && (
        <Button onClick={() => setShowForm(true)}>Update User Details</Button>
      )}
    </div>
  );
};

export default UpdateUser;
