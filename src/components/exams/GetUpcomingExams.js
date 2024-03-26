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
    const { user, userCourse, setExam, studentExam } = useUser();
    const [upcomingExams, setUpcomingExams] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalConfirmed, setModalConfirmed] = useState(false);

    let getUpcomingExamsByCourseApiUrl;
    if (userCourse) {
        getUpcomingExamsByCourseApiUrl = `https://localhost:7252/api/Course/${userCourse.id}/exams`;
    }

    const { data: examsData, isLoading, error } = useFetch(getUpcomingExamsByCourseApiUrl);
    const studentsTakenExamsApiUrl = `https://localhost:7252/api/User/${user.id}/submitted-exams`;
    const { data: studentsTakenExams } = useFetch(studentsTakenExamsApiUrl);

    const { filterText, setFilterText } = useFilterableTable(upcomingExams || []);

    useEffect(() => {
        const fetchCurrentDateTime = async () => {
            const response = await fetch('https://worldtimeapi.org/api/ip');
            const data = await response.json();
            const currentDateTime = data.datetime;
            
            if (examsData && studentsTakenExams) {
                const filteredExams = examsData.filter(exam => {
                    const isUpcomingExam = new Date(exam.startExamDateTime) > new Date(currentDateTime);
                    const isNotTaken = !studentsTakenExams.some(takenExam => takenExam.examId === exam.id);
                    return isUpcomingExam && isNotTaken;
                });
                setUpcomingExams(filteredExams);
            }
        };

        fetchCurrentDateTime();
    }, [examsData, studentsTakenExams]);

    const navigate = useNavigate();

    const handleTakeExam = (exam) => {
        setExam(exam);
        if (!studentExam) return;
        if (studentExam.id) {
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setExam(null);
        setShowModal(false);
    };

    const handleModalConfirm = () => {
        setModalConfirmed(true);
        navigate("/take-exam");
        setShowModal(false);
    };

    return (
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {upcomingExams.length > 0 && (
                    <div>
                        <SearchBar filterText={filterText} setFilterText={setFilterText} />
                        <div style={{ overflowX: 'auto' }}>
                            <Alert className="mt-2" variant="primary" style={{ display: "inline-block" }}>DoubleClick to start an exam</Alert>
                            <DataTable data={upcomingExams} onTakeExam={handleTakeExam} />
                        </div>
                        <Modal show={showModal} onHide={handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Exam Confirmation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Do you want to log into the exam?
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
                {modalConfirmed && <TakeExam />}
            </Card.Body>
        </Card>
    );
};

export default GetUpcomingExams;
