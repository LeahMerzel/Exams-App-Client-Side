import React from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import { Spinner, Alert } from "react-bootstrap";

const GetSubmitedExams = ({ studentId, examId}) => {
    let getAllStudenExamsApiUrl = studentId? `https://localhost:7252/api/User/${studentId}/submitted-exams`: `https://localhost:7252/api/StudentExam/${examId}/submitted-student-exams`;
    const { data: submitedExams, isLoading, error } = useFetch(getAllStudenExamsApiUrl || '');
    const { filterText, setFilterText, filteredData } = useFilterableTable(submitedExams || []);
  
    return (
      <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        {submitedExams && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} />
          </div>
        )}
      </div>
    );
  };
  
  export default GetSubmitedExams;