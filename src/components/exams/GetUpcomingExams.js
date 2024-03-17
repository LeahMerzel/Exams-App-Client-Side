import React, { useState, useEffect } from "react";
import { Spinner, Alert, Card, Modal, Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import TakeExam from "./TakeExam";
import { useUser } from "../auth/UserContext";
import { useNavigate } from 'react-router-dom';

const GetUpcomingExams = () => {
    const { userCourse, setExamId, studentExamId } = useUser();
    let getUpcomingExamsByCourseApiUrl;
    if (userCourse){
        getUpcomingExamsByCourseApiUrl = `https://localhost:7252/api/Course/${userCourse.id}/exams`;
    }
    const { data: upcomingExams, isLoading, error } = useFetch(getUpcomingExamsByCourseApiUrl);
    const { filterText, setFilterText} = useFilterableTable(upcomingExams || []);
    const [showModal, setShowModal] = useState(false);
    const [modalConfirmed, setModalConfirmed] = useState(false);

    const currentDateTime = new Date().toISOString();
    const filteredExams = upcomingExams?.filter(exam => exam.startExamDateTime > currentDateTime);

    const navigate = useNavigate();


    const handleTakeExam = (examId) => {
        setExamId(examId);
        if (studentExamId){
        setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setExamId(null);
        setShowModal(false);
    };

    const handleModalConfirm = () => {
        setModalConfirmed(true);
        navigate("/take-exam")
        setShowModal(false);
    };

    return(
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {filteredExams && (
                        <div>
                            <SearchBar filterText={filterText} setFilterText={setFilterText} />
                            <div style={{ overflowX: 'auto' }}>
                            <Alert>DoubleClick to start an exam</Alert>
                            <DataTable data={filteredExams} onTakeExam={handleTakeExam}/>
                        </div>
                            <Modal show={showModal} onHide={handleModalClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Exam Confirmation</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Do you want to log into the exam? The exam timer will start.
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleModalClose}>
                                        Cancel
                                    </Button>
                                    <Button variant="primary" onClick={handleModalConfirm}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    )}
                    <div>
                        {modalConfirmed && (
                            <TakeExam />
                        )}
                    </div>
            </Card.Body>
        </Card>
    );
};

export default GetUpcomingExams;