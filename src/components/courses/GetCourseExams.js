import React from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert } from "react-bootstrap";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';

const GetAllCourseExams = (courseId) => {
    let getCourseExamsApiUrl = `https://localhost:7252/api/Course/${courseId}/exams`;
    const { data: courseExams, isLoading, error } = useFetch(getCourseExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(courseExams || []);
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {courseExams && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} /> 
          </div>
        )}
      </div>
    );
  };

  
  export default GetAllCourseExams;