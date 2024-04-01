import React, { useState, useEffect } from "react";
import { Spinner, Alert, Card, Modal, Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateExam from './UpdateExam';
import RemoveExam from "./RemoveExam";
import { useUser } from "../auth/UserContext";
import GetExamGradesAvg from "./GetExamGradesAvg";

const GetAllExams = () => {
    const { user } = useUser();
    const getAllExamsApiUrl = `https://localhost:7252/api/User/${user.id}/teacher-exams`;

    const { data: exams, isLoading, error, refetch } = useFetch(getAllExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(exams || []);

    const excludedProperties = ['examQuestions', 'studentsExams', 'examGradeAvg'];
    const filteredDataWithoutExcludedProperties = filteredData.map(exam => {
        const filteredExam = { ...exam };
        excludedProperties.forEach(prop => delete filteredExam[prop]);
        return filteredExam;
    })

    const [selectedExamId, setSelectedExamId] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false); 
    const [deleteSuccess, setDeleteSuccess] = useState(false); 

    const handleUpdateSuccess = () => {
        setUpdateSuccess(true);
        handleCloseModal();
    };

    const handleDeleteSuccess = () => {
        setDeleteSuccess(true);
        handleCloseModal();
    };

    useEffect(() => {
        if (updateSuccess || deleteSuccess) {
          refetch(); 
          setUpdateSuccess(false);
          setDeleteSuccess(false);
        }
      }, [updateSuccess, deleteSuccess]);    

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
        setShowGradeModal(false);
    };

    const handleGetGradeAvg = (examId) => {
        setSelectedExamId(examId);
        setShowGradeModal(true);
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
                                data={filteredDataWithoutExcludedProperties}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onGetGradeAvg={handleGetGradeAvg}
                            />
                        </div>
                        <Modal show={showEditModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Exam</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedExamId && <UpdateExam examId={selectedExamId} onUpdateSuccess={handleUpdateSuccess} />}
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
                                {!!selectedExamId && <RemoveExam examId={selectedExamId} onDeleteSuccess={handleDeleteSuccess}/>}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showGradeModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Exam Grade Avarage</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedExamId && <GetExamGradesAvg examId={selectedExamId} />}
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
