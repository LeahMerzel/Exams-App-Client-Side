import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveExam = ( {examId} ) => {
    const removeExamUrl = `https://localhost:7252/api/Exam/delete-${examId}`;
    const { deleteEntity, isLoading, error } = useDelete(removeExamUrl);

    const handleDelete = async () => {
        try {
            await deleteEntity();
        } catch (error) {
            console.error("Error removing exam: ", error);
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

export default RemoveExam;
