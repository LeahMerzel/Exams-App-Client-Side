import React from "react";
import useDelete from "../../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveQuestion = ( questionId ) => {
    const removeQuestionUrl = `https://localhost:7252/api/Question/delete-${questionId}`;
    const { deleteEntity, isLoading, error } = useDelete(removeQuestionUrl);

    const handleDelete = async () => {
        try {
            await deleteEntity();
        } catch (error) {
            console.error("Error removing question: ", error);
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

export default RemoveQuestion;
