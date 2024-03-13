// UserCoursesContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '../auth/UserContext';
import { fetchCourseUsers } from '../api/CourseUsersApi';

const UserCoursesContext = createContext();

export const UserCoursesProvider = ({ children }) => {
  const { user } = useUser();
  const [userCourses, setUserCourses] = useState([]);
  const [courseUsersChanged, setCourseUsersChanged] = useState();

  useEffect(() => {
    if (user && courseUsersChanged) { 
      const fetchData = async () => {
        try {
          const response = await fetch('https://localhost:7252/api/Course/get-all');
          if (!response.ok) {
            throw new Error('Failed to fetch courses');
          }
          const coursesData = await response.json();
          const allUserCourses = await Promise.all(
            coursesData.map(async course => {
              const userCourses = await fetchCourseUsers(course.id, user.id);
              return { ...course, userCourses };
            })
          );
          setUserCourses(allUserCourses);
          setCourseUsersChanged(false); // Reset to false after updating userCourses
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };

      fetchData();
    }
  }, [user, courseUsersChanged]); // Add user and user.id as dependencies

  return (
    <UserCoursesContext.Provider value={{ userCourses, setCourseUsersChanged }}>
      {children}
    </UserCoursesContext.Provider>
  );
};

export const useUserCourses = () => {
  const context = useContext(UserCoursesContext);
  if (!context) {
    throw new Error('useUserCourses must be used within a UserCoursesProvider');
  }
  return context;
};
