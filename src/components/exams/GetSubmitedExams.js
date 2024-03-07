import React from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import { Spinner, Alert } from "react-bootstrap";
import { useUser } from '../auth/UserContext';

const GetSubmitedExams = (entityId) => {
    const { userRole } = useUser();
    let getAllStudenExamsApiUrl = userRole ==="Teacher" 
    ? `https://localhost:7252/api/Exam/${entityId}/submitted-student-exams`
    : `https://localhost:7252/api/User/${entityId}/submitted-exams`;

    const { data: submitedExams, isLoading, error } = useFetch(getAllStudenExamsApiUrl);
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