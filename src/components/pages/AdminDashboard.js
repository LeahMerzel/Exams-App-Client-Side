import React from 'react';
import GetAllExams from '../exams/GetAllExams';
import GetAllCourses from '../courses/GetAllCourses';
import { useUser } from '../auth/UserContext';
import CreateNewCourse from '../courses/CreateNewCourse';
import CreateNewExam from '../exams/CreateNewExam';
import CreateNewUser from '../users/CreateNewUser';
import { Container } from 'react-bootstrap';
import GetAllUsers from '../users/GetAllUsers';
import GetUserData from '../users/GetUserData';

const AdminDashboard = () => {
  const { user, userLoggedIn } = useUser();

  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <h3>Admin Dashboard</h3>
      <h4>My Info</h4>
      <GetUserData forUser={user}/>
      {userLoggedIn && (
        <>
          <h4>All App Users:</h4>
          <GetAllUsers />
          <CreateNewUser />
          <h4>All App Exams</h4>
          <GetAllExams />
          <CreateNewExam />
          <h4>All App Courses</h4>
          <GetAllCourses />
          <CreateNewCourse />
        </>
      )}
    </Container>
    </div>
  );
};

export default AdminDashboard;
