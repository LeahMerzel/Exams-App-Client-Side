import React from "react";
import GetUserData from '../../users/GetUserData';
import { useUser } from "../../auth/UserContext";
import { Container } from 'react-bootstrap';
import GetUpcomingExams from "../../exams/GetUpcomingExams";
import GetStudentCourses from "../../courses/GetStudentCourses";
import GetSubmitedExams from "../../exams/GetSubmitedExams";
import AddUserToCourse from "../../courses/AddUserToCourse";

const StudentDashboard = () => {
  const { userCourse, token, user, userLoggedIn} = useUser()

  return (
    <div>
    <Container className="align-items-center mt-3 p-3 mb-5">
      <h3>Student Dashboard</h3>
      {userLoggedIn && (
        <>
          {userCourse == null && (
          <AddUserToCourse />
          )}
          <h4>My Info</h4>
          <GetUserData token={token} forUser={user}/>
          <h4>Upcoming Exams</h4>
          <GetUpcomingExams token={token} studentId={user.userId}/>
          <h4>Exams I Took</h4>
          <GetSubmitedExams token={token} studentId={user.userId}/>
          <h4>My Courses</h4>
          <GetStudentCourses token={token} studentId={user.userId}/>
        </>
      )}
      </Container>
    </div>
  );
};

export default StudentDashboard;