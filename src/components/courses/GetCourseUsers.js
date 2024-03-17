import React, { useState, useEffect } from 'react';
import { useUser } from '../auth/UserContext';
import DataTable from '../filterableTable/DataTable';
import SearchBar from '../filterableTable/SearchBar';
import { fetchCourseUsers } from '../api/CourseUsersApi';
import useFilterableTable from '../hooks/useFilterableTable';
import { Card } from 'react-bootstrap';

const FetchCourseUsers = () => {
  const { userCourse } = useUser();
  const [courseUsers, setCourseUsers] = useState(null);
  const { filterText, setFilterText, filteredData } = useFilterableTable(courseUsers || []);

  useEffect(() => {
    const getCourseUsers = async () => {
      try {
        const response = await fetchCourseUsers(userCourse.id);
        setCourseUsers(response);
      } catch (error) {
        console.error('Error fetching course users:', error);
      }
    };

    if (userCourse) {
      getCourseUsers();
    }
  }, [userCourse]);

  return (
    <Card>
      <Card.Body>
        {courseUsers && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <div style={{ overflowX: 'auto' }}>
              <DataTable data={filteredData} entityName={"users"}/>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default FetchCourseUsers;
