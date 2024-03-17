import React, { useState } from "react";
import { Spinner, Alert, Card, Modal, Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateExam from './UpdateExam';
import GetSubmitedExams from "./GetSubmitedExams";
import RemoveExam from "./RemoveExam";
import { useUser } from "../auth/UserContext";

const GetAllExams = () => {
    const { user, userRole } = useUser();
    const getAllExamsApiUrl = userRole === "Admin"
        ? "https://localhost:7252/api/Exam/get-all"
        : `https://localhost:7252/api/User/${user.id}/teacher-exams`;

    const { data: exams, isLoading, error } = useFetch(getAllExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(exams || []);

    const [selectedExamId, setSelectedExamId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleEdit = (examId) => {
        setSelectedExamId(examId);
        setShowEditModal(true);
    };

    const handleDelete = (examId) => {
        setSelectedExamId(examId);
        setShowDeleteModal(true);
    };

    const handleCloseModal = () => {
        setSelectedExamId(null);
        setShowEditModal(false);
        setShowDeleteModal(false);
    };

    return (
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {exams && (
                    <div>
                        <SearchBar filterText={filterText} setFilterText={setFilterText} />
                        <div style={{ overflowX: 'auto' }}>
                            <DataTable
                                data={filteredData}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                        <Modal show={showEditModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Exam</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedExamId && <UpdateExam examId={selectedExamId} />}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showDeleteModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Exam</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedExamId && <RemoveExam examId={selectedExamId} />}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default GetAllExams;
