import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { Spinner, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import TakeExam from "./TakeExam";

const GetUpcomingExams = ({ courseId }) => {
    const getUpcomingExamsByCourseApiUrl = `https://localhost:7252/api/Course/${courseId}/exams`;
    const { data: upcomingExams, isLoading, error } = useFetch(getUpcomingExamsByCourseApiUrl);
    const { filterText, setFilterText} = useFilterableTable(upcomingExams || []);

    const currentDateTime = new Date().toISOString();
    const filteredExams = upcomingExams?.filter(exam => exam.startExamDateTime > currentDateTime);

    const handleTakeExam = (item) => {
      return <TakeExam examId={item}/>
    };

    return(
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {filteredExams && (
                <div>
                    <SearchBar filterText={filterText} setFilterText={setFilterText} />
                    <DataTable data={filteredExams} onTakeExam={handleTakeExam} />
                </div>
            )}
        </div>
    );
};

export default GetUpcomingExams;
