import React from 'react';
import GetAllExams from '../../exams/GetAllExams';
import GetUserData from '../../users/GetUserData';
import { useUser } from '../../auth/UserContext';
import CreateNewExam from '../../exams/CreateNewExam';
import { Container, Row, Col } from 'react-bootstrap';
import AddUserToCourse from '../../courses/AddUserToCourse';
import GetCourseUsers from '../../courses/GetCourseUsers';
import GetUserCourses from '../../users/GetUserCourses';
import { useUserCourses } from '../../courses/UserCoursesContext';

const TeacherDashboard = () => {
  const { userLoggedIn } = useUser();
  const { userCourses } = useUserCourses();
  
  if (userCourses){
    console.log("user courses", userCourses);
  }

  return (
    <Container className="align-items-center mt-3 mb-5 p-3">
      <h3>Teacher Dashboard</h3>
      {userLoggedIn && (
        <>
          <Row>
            <Col xs={12} md={3} lg={3} className="mb-4">
              <h4>Add Teacher To Course</h4>
              <AddUserToCourse />
            </Col>
            {userCourses && (
              <>
                  <Col xs={12} md={9} lg={9} className="mb-4">
                  <h4>My Info</h4>
                  <GetUserData />
                  </Col>
                    <Row>
                    <Col xs={12} md={9} lg={9} className="mb-4">
                      <h4>My Exams:</h4>
                      <GetAllExams />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-4">
                      <h4>Create New Exam</h4>
                      <CreateNewExam />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={9} lg={9} className="mb-4">
                      <h4>The Courses I Teach In</h4>
                      <GetUserCourses />
                    </Col>
                    <Col xs={12} md={3} lg={3} className="mb-4">
                      <h4>My Students:</h4>
                      <GetCourseUsers />
                    </Col>
                  </Row>
            </>
          )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default TeacherDashboard;
