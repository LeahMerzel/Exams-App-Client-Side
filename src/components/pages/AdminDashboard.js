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
  const { token, user, userLoggedIn } = useUser();

  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <h3>Admin Dashboard</h3>
      <h4>My Info</h4>
      <GetUserData token={token} forUser={user}/>
      {userLoggedIn && (
        <>
          <h4>All App Users:</h4>
          <GetAllUsers token={token}/>
          <CreateNewUser token={token}/>
          <h4>All App Exams</h4>
          <GetAllExams token={token}/>
          <CreateNewExam token={token}/>
          <h4>All App Courses</h4>
          <GetAllCourses token={token}/>
          <CreateNewCourse token={token}/>
        </>
      )}
    </Container>
    </div>
  );
};

export default AdminDashboard;
