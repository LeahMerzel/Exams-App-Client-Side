import React from "react";
import GetUserData from '../../users/GetUserData';
import { useUser } from "../../auth/UserContext";
import { Container, Row, Col } from 'react-bootstrap';
import GetUpcomingExams from "../../exams/GetUpcomingExams";
import GetSubmitedExams from "../../exams/GetSubmitedExams";
import AddUserToCourse from "../../courses/AddUserToCourse";
import GetUserCourse from '../../users/GetUserCourse';

const StudentDashboard = () => {
  const {userCourse, userLoggedIn} = useUser();

  return (
    <Container className="align-items-center mt-3 p-3 mb-5">
      <h3>Student Dashboard</h3>
      <br className="mb-3"/>
      {userLoggedIn && (
        <>
         <Row>
            <Col xs={12} md={3} lg={3} className="mb-5">
              <h4>Manage Student's Course</h4>
              <AddUserToCourse/>
            </Col>
            {userCourse && (
              <>
                <Col xs={12} md={9} lg={9} className="mb-5">
                  <h4>My Info</h4>
                  <GetUserData />
                </Col>
                <Row>
                  <Col xs={12} md={9} lg={9} className="mb-5">
                    <h4>My Course</h4>
                    <GetUserCourse />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12} className="mb-5">
                    <h4>Upcoming Exams</h4>
                    <GetUpcomingExams />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={12} lg={12} className="mb-5">
                    <h4>Exams I Took</h4>
                    <GetSubmitedExams />
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

export default StudentDashboard;
