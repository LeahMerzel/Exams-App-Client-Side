import React from "react";
import useDelete from "../../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveAnswer = ( answerId ) => {
    const removeAnswerUrl = `https://localhost:7252/api/Answer/delete-${answerId}`;
    const { deleteEntity, isLoading, error } = useDelete(removeAnswerUrl);

    const handleDelete = async () => {
        try {
            await deleteEntity();
        } catch (error) {
            console.error("Error removing answer: ", error);
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

export default RemoveAnswer;
