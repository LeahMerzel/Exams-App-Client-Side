import React, { useState, useEffect } from 'react';
import { useUser } from '../auth/UserContext';
import DataTable from '../filterableTable/DataTable';
import SearchBar from '../filterableTable/SearchBar';
import { fetchCourseUsers } from '../api/CourseUsersApi';
import { Card, Spinner, Alert } from 'react-bootstrap';

const GetCourseUsers = () => {
  const { userCourse } = useUser();
  const [courseUsers, setCourseUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [filterText, setFilterText] = useState('');

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

  useEffect(() => {
    if (!courseUsers) return;

    // Filter out users with the role "Teacher" and exclude specific properties
    const filtered = courseUsers.map(user => {
      if (user.userRole === 'Teacher') return null; // Exclude teachers
      const { teachersExams, studentsTakenExams, studentGradeAvg, Actions, ...filteredUser } = user;
      return filteredUser;
    }).filter(Boolean); // Filter out null values (teachers)
    setFilteredUsers(filtered);
  }, [courseUsers]);

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  const filteredData = filteredUsers?.filter(user =>
    Object.values(user).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(filterText.toLowerCase())
    )
  );

  return (
    <Card>
      <Card.Body>
        {courseUsers === null && <Spinner animation="border" />}
        {courseUsers !== null && courseUsers.length === 0 && <Alert variant="info">No users found.</Alert>}
        {courseUsers !== null && courseUsers.length > 0 && (
          <div>
            <SearchBar filterText={filterText} setFilterText={handleFilterChange} />
            <div style={{ overflowX: 'auto' }}>
              <DataTable data={filteredData} entityName="users" />
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default GetCourseUsers;
