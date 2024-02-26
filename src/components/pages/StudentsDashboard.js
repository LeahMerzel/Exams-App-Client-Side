import React from "react";
import GetUserData from '../users/GetUserData';
import { useUser } from "../auth/UserContext";
import { Container } from 'react-bootstrap';
import GetUpcomingExams from "../exams/GetUpcomingExams";
import GetStudentCourses from "../courses/GetStudentCourses";
import GetSubmitedExams from "../exams/GetSubmitedExams";

const StudentDashboard = () => {
  const { user, userLoggedIn} = useUser()

  return (
    <div>
    <Container className="align-items-center mt-3 p-3 mb-5">
      <h3>Student Dashboard</h3>
      <h4>My Info</h4>
      <GetUserData forUser={user}/>
      {userLoggedIn && (
        <>
          <h4>Upcoming Exams</h4>
          <GetUpcomingExams studentId={user.Id}/>
          <h4>Exams I Took</h4>
          <GetSubmitedExams studentId={user.Id}/>
          <h4>My Courses</h4>
          <GetStudentCourses studentId={user.Id}/>
       </>
      )}
      </Container>
    </div>
  );
};

export default StudentDashboard;