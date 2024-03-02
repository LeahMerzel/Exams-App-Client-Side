import React from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import { Spinner, Alert } from "react-bootstrap";
import { useUser } from '../auth/UserContext';

const GetSubmitedExams = ({ token, studentId, examId}) => {
    let getAllStudenExamsApiUrl;
    const { userRole } = useUser();
    if (userRole === 1){
      getAllStudenExamsApiUrl = `https://localhost:7252/api/StudentExam/${examId}/submitted-student-exams`;
    }
    else if (userRole === 2){
      getAllStudenExamsApiUrl = `https://localhost:7252/api/User/${studentId}/submitted-exams`;
    }
    const { data: submitedExams, isLoading, error } = useFetch(token, getAllStudenExamsApiUrl || '');
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