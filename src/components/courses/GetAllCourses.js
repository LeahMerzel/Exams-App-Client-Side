import React from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert } from "react-bootstrap";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateCourse from "./UpdateCourse";

const GetAllCourses = ({token, id}) => {
    let getAllCoursesApiUrl = id? `https://localhoast:7252/api/User/${id}/courses`: "https://localhost:7252/api/Course/get-all";
    const { data: courses, isLoading, error } = useFetch(token, getAllCoursesApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(courses || []);

    const handleEdit = (item) => {
      <UpdateCourse item={item} />;
    };
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {courses && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onEdit={handleEdit} />
          </div>
        )}
      </div>
    );
  };
  
  export default GetAllCourses;