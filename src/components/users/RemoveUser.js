import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveUser = ( {userId} ) => {
    const removeUserUrl = `https://localhost:7252/api/User/delete-${userId}`;
    const { deleteEntity, isLoading, error } = useDelete(removeUserUrl);

    const handleDelete = async () => {
        try {
            await deleteEntity();
        } catch (error) {
            console.error("Error removing user: ", error);
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
