import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveCourse = ( courseId ) => {
    const removeCourseUrl = `https://localhost:7252/api/Course/delete-${courseId}`;
    const { deleteEntity, isLoading, error } = useDelete(removeCourseUrl);

    const handleDelete = async () => {
        try {
            await deleteEntity();
        } catch (error) {
            console.error("Error removing course: ", error);
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

export default RemoveCourse;
