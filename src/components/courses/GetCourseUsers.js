import React, { useState, useEffect } from 'react';
import { useUser } from '../auth/UserContext';
import DataTable from '../filterableTable/DataTable';
import SearchBar from '../filterableTable/SearchBar';

const FetchCourseUsers = () => {
  const { userCourses } = useUser();
  const [courseUsers, setCourseUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseUsers = async () => {
      try {
        if (userCourses && userCourses.length > 0) {
          const promises = userCourses.map(async course => {
            const response = await fetch(`https://localhost:7252/api/Course/${course.id}/course-users`);
            if (!response.ok) {
              throw new Error('Failed to fetch course users');
            }
            return response.json();
          });

          const users = await Promise.all(promises);
          setCourseUsers(users);
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching course users:', error);
      }
    };

    fetchCourseUsers();
  }, [userCourses]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredUsers = courseUsers.filter(user => {
    return (
      (user.name && user.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(filterText.toLowerCase()))
    );
  });
  
  return (
    <div>
      <h2>Course Users</h2>
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      {filteredUsers.map((users, index) => (
        <div key={index}>
          <h3>Course {index + 1}</h3>
          <DataTable data={users} />
        </div>
      ))}
    </div>
  );
};

export default FetchCourseUsers;
