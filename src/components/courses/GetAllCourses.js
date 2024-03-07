import React from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert } from "react-bootstrap";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateCourse from "./UpdateCourse";
import { useUser } from '../auth/UserContext';
import RemoveCourse from "./RemoveCourse";

const GetAllCourses = () => {
    const { userRole, user } = useUser();
    let getAllCoursesApiUrl = `https://localhost:7252/api/User/${user.userId}/user-courses`;
    if (userRole === "Admin") {
      getAllCoursesApiUrl = "https://localhost:7252/api/Course/get-all";
    }      
    const { data: courses, isLoading, error } = useFetch(getAllCoursesApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(courses || []);

    const handleEdit = (item) => {
      return <UpdateCourse courseId={item} />;
    };

    const handleDelete = (item) => {
      return <RemoveCourse courseId={item}/>
    };
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {courses && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
          </div>
        )}
      </div>
    );
  };

  
  export default GetAllCourses;