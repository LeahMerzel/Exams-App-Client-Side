import React from 'react';
import GetAllExams from '../../exams/GetAllExams';
import GetAllCourses from '../../courses/GetAllCourses';
import GetUserData from '../../users/GetUserData';
import { useUser } from '../../auth/UserContext';
import CreateNewExam from '../../exams/CreateNewExam';
import { Container } from 'react-bootstrap';
import GetAllUsers from '../../users/GetAllUsers';

const TeacherDashboard = () => {
  const { token, user, userLoggedIn } = useUser();

  return (
    <div>
      <Container className="align-items-center mt-3 mb-5 p-3">
        <h3>Teacher Dashboard</h3>
        <h4>My Info</h4>
        <GetUserData />
        {userLoggedIn && (
          <>
            <h4>My Exams:</h4>
            <GetAllExams />
            <h4>Create New Exam</h4>
            <CreateNewExam />
            <h4>My Students:</h4>
            <GetAllUsers />
            <h4>The Courses I Teach In</h4>
            <GetAllCourses />
          </>
        )}
      </Container>
    </div>
  );
};

export default TeacherDashboard;
