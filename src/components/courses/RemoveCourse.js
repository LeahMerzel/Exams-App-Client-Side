// RemoveCourse.js

import React from "react";
import { Button, Alert } from "react-bootstrap";
import useDelete from "../hooks/useDelete";

const RemoveCourse = ({ courseId, onRemoveSuccess }) => {
  const removeCourseApiUrl = `https://localhost:7252/api/Course/delete-${courseId}`;
  const { deleteEntity, isLoading: isRemoving, error: removeError } = useDelete(removeCourseApiUrl);

  const handleRemove = async () => {
    try {
      await deleteEntity();
      // Handle success
      onRemoveSuccess(); // Trigger action after successful delete
    } catch (error) {
      console.error('Delete failed:', error.message);
      // Handle error
    }
  };

  return (
    <div>
      {removeError && <Alert variant="danger">Error: {removeError}</Alert>}
      <p>Are you sure you want to delete this course?</p>
      <Button variant="danger" onClick={handleRemove} disabled={isRemoving}>
        {isRemoving ? 'Deleting...' : 'Delete'}
      </Button>
    </div>
  );
};

export default RemoveCourse;
