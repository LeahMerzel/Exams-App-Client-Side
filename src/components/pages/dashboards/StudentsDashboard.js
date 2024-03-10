import React from "react";
import GetUserData from '../../users/GetUserData';
import { useUser } from "../../auth/UserContext";
import { Container, Row, Col } from 'react-bootstrap';
import GetUpcomingExams from "../../exams/GetUpcomingExams";
import GetSubmitedExams from "../../exams/GetSubmitedExams";
import AddUserToCourse from "../../courses/AddUserToCourse";
import GetAllCourses from '../../courses/GetAllCourses';

const StudentDashboard = () => {
  const {userLoggedIn} = useUser()

  return (
    <Container className="align-items-center mt-3 p-3 mb-5">
      <h3>Student Dashboard</h3>
      <Row>
        <Col xs={12} md={9} lg={9} className="mb-4">
          <h4>My Info</h4>
          <GetUserData />
        </Col>
      </Row>
      {userLoggedIn && (
        <>
          <Row>
            <Col xs={12} md={9} lg={9} className="mb-4">
              <h4>My Courses</h4>
              <GetAllCourses />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={9} lg={9} className="mb-4">
              <h4>Upcoming Exams</h4>
              <GetUpcomingExams />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={9} lg={9} className="mb-4">
              <h4>Exams I Took</h4>
              <GetSubmitedExams />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={3} lg={3} className="mb-4">
              <AddUserToCourse />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default StudentDashboard;
