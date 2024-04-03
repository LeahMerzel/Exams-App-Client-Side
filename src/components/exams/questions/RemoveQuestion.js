import React, {useState} from "react";
import useDelete from "../../hooks/useDelete";
import { Button, Spinner, Alert } from "react-bootstrap";

const RemoveQuestion = ( {questionId, onDeleteSuccess} ) => {
    const removeQuestionUrl = `https://localhost:7252/api/Question/delete-${questionId}`;
    const { deleteEntity, isLoading, error } = useDelete(removeQuestionUrl);

    const [showForm, setShowForm] = useState(true);

    const handleDelete = async () => {
        try {
            await deleteEntity();
            onDeleteSuccess();
        } catch (error) {
            console.error("Error removing question: ", error);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
      }

    return (
        <>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {showForm && (
            <>
            <Button className="mt-2" variant="danger" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? 'Deleting...' : 'Confirm Deletion'}
            </Button>
            <Button className="mt-2" variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
            </>
            )}
        </>
    );
};

export default RemoveQuestion;
