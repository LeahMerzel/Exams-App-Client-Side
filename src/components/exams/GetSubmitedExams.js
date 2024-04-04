import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import { Spinner, Alert, Card, Modal, Button } from "react-bootstrap";
import { useUser } from '../auth/UserContext';
import GetQuestionsFailed from "./questions/GetQuestionsFailed";

const GetSubmitedExams = () => {
    const { userRole, user } = useUser();
    const [studentExamId, setStudentExamId] = useState(null); 

    let getAllStudentExamsApiUrl = userRole === "Teacher" 
        ? `https://localhost:7252/api/Exam/${user.id}/submitted-student-exams`
        : `https://localhost:7252/api/User/${user.id}/submitted-exams`;

    const { data: submittedExams, isLoading, error } = useFetch(getAllStudentExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(submittedExams || []);
    const excludedProperties = ['wasExamLoggedInToByStudent','questionsFailed', 'examStartTime'];
    const filteredDataWithoutExcludedProperties = filteredData.map(exam => {
        const filteredExam = { ...exam };
        excludedProperties.forEach(prop => delete filteredExam[prop]);
        return filteredExam;
    })


    const handleGetQuestionFailed = (studentExamId) => {
        setStudentExamId(studentExamId);
    };

    const clearStudentExamId = () => {
        setStudentExamId(null);
    };

    return (
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {submittedExams && (
                    <div>
                        <SearchBar filterText={filterText} setFilterText={setFilterText} />
                        <div style={{ overflowX: 'auto' }}>
                            <DataTable data={filteredDataWithoutExcludedProperties} onGetQuestionFailed={handleGetQuestionFailed} />
                        </div>
                        <Modal show={!!studentExamId} onHide={clearStudentExamId}>
                            <Modal.Header closeButton>
                                <Modal.Title>Failed Questions</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {studentExamId && <GetQuestionsFailed studentExamId={studentExamId} />}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={clearStudentExamId}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default GetSubmitedExams;
