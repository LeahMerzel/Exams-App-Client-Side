import React from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert } from "react-bootstrap";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateCourse from "./UpdateCourse";
import { useUser } from '../auth/UserContext';
import RemoveCourse from "./RemoveCourse";
import GetUpcomingExams from "../exams/GetUpcomingExams";
import GetCourseExams from './GetCourseExams';

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

    const handleGetCourseUpcomingExams = (item) => {
      return <GetUpcomingExams courseId={item}/>
    };
    
    const handleGetCourseExams = (item) => {
      return <GetCourseExams courseId={item}/>
    };
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {courses && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} 
            onCourseExams={userRole === "Student"? handleGetCourseUpcomingExams : handleGetCourseExams}/>
          </div>
        )}
      </div>
    );
  };

  
  export default GetAllCourses;