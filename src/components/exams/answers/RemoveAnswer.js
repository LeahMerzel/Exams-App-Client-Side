import React, { useState } from "react";
import useDelete from "../../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveAnswer = ({ answerId, onDeleteSuccess }) => {
  const removeAnswerUrl = `https://localhost:7252/api/Answer/delete-${answerId}`;
  const { deleteEntity, isLoading, error } = useDelete(removeAnswerUrl);

  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleDelete = async () => {
    try {
      await deleteEntity();
      onDeleteSuccess();
    } catch (error) {
      console.error("Error removing answer: ", error);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {showConfirmation && (
        <>
          <Button
            className="mt-2"
            variant="danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm Deletion"}
          </Button>
          <Button
            className="mt-2"
            variant="secondary"
            onClick={handleCancel}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  );
};

export default RemoveAnswer;
