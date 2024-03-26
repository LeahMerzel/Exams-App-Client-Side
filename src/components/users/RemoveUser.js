// RemoveUser.js

import React from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import useDelete from "../hooks/useDelete";

const RemoveUser = ({ userId, onRemoveSuccess }) => {
  const removeUserUrl = `https://localhost:7252/api/User/delete-${userId}`;
  const { deleteEntity, isLoading, error } = useDelete(removeUserUrl);

  const handleDelete = async () => {
    try {
      await deleteEntity();
      // Handle success
      onRemoveSuccess(); // Trigger action after successful delete
    } catch (error) {
      console.error("Error removing user: ", error);
      // Handle error
    }
  };

  return (
    <>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
    </>
  );
};

export default RemoveUser;
