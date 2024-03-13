import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import { useUser } from '../auth/UserContext';
import GetUpcomingExams from "../exams/GetUpcomingExams";
import GetCourseExams from '../courses/GetCourseExams';

const GetUserCourses = () => {
    const { getUserCourses, userCourses, userRole, user } = useUser();
    const { filterText, setFilterText, filteredData } = useFilterableTable(userCourses || []);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getUserCourses(user.id); 
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleGetCourseUpcomingExams = (item) => {
      return <GetUpcomingExams courseId={item}/>
    };
    
    const handleGetCourseExams = (item) => {
      return <GetCourseExams courseId={item}/>
    };
  
    return (
      <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {userCourses && !isLoading && !error && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onCourseExams={userRole === "Student"? handleGetCourseUpcomingExams : handleGetCourseExams}/>
          </div>
        )}
      </div>
    );
};

export default GetUserCourses;
