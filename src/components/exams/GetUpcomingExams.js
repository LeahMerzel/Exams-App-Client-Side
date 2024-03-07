import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';
import { Spinner, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import TakeExam from "./TakeExam";

const GetUpcomingExams = ({token, courseId}) => {
    const getUpcomingExamsByCourseApiUrl = `https://localhost:7252/api/Course/${courseId}/exams`;
    const { data: upcomingExams, isLoading, error } = useFetch(getUpcomingExamsByCourseApiUrl, token);
    const { filterText, setFilterText, filteredData } = useFilterableTable(upcomingExams || []);
    const [isRoleStudent] = useState(true);
    const [showTakeExamModal, setShowTakeExamModal] = useState(false);
    const [selectedExam, setSelectedExam] = useState(null);

    const handleTakeExam = (exam) => {
        setSelectedExam(exam);
        setShowTakeExamModal(true);
      };
  
      const handleCloseModal = () => {
        setShowTakeExamModal(false);
      };  

    return(
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {upcomingExams && (
                <div>
                    <SearchBar filterText={filterText} setFilterText={setFilterText} />
                    <DataTable data={filteredData} onTakeExam={handleTakeExam} studentExam={isRoleStudent} />
                </div>
            )}
            <Modal show={showTakeExamModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Take Exam</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedExam && <TakeExam exam={selectedExam} />}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
    );
};

export default GetUpcomingExams;