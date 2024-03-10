import React from 'react';
import GetAllExams from '../../exams/GetAllExams';
import GetAllCourses from '../../courses/GetAllCourses';
import { useUser } from '../../auth/UserContext';
import CreateNewCourse from '../../courses/CreateNewCourse';
import CreateNewExam from '../../exams/CreateNewExam';
import CreateNewUser from '../../users/CreateNewUser';
import { Container, Row, Col } from 'react-bootstrap';
import GetAllUsers from '../../users/GetAllUsers';
import GetUserData from '../../users/GetUserData';
import GetCourseUsers from '../../courses/GetCourseUsers';

const AdminDashboard = () => {
  const { userLoggedIn } = useUser();

  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <Row>
        <Col><h3>Admin Dashboard</h3></Col>
      </Row>
      <Row>
        <Col xs={12} md={9} lg={9} className="mb-4">
        <h4>Admin Data:</h4>
        <GetUserData />
        </Col>
      </Row>
      {!userLoggedIn && (
        <>
        <Row>
          <Col xs={12} md={9} lg={9} className="mb-4">
          <h4>All App Users:</h4>
          <GetAllUsers />
          </Col>
          <Col xs={12} md={3} lg={3} className="mb-4">
            <CreateNewUser />
          </Col>
        </Row>
        <Row>
            <Col xs={12} md={9} lg={9} className="mb-4">
            <h4>App's Users By Course</h4>
            <GetCourseUsers />
            </Col>
        </Row>
        <Row>
          <Col xs={12} md={9} lg={9} className="mb-4">
          <h4>All App Exams</h4>
          <GetAllExams />
          </Col>
          <Col xs={12} md={3} lg={3} className="mb-4">
          <CreateNewExam />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={9} lg={9} className="mb-4">
          <h4>All App Courses</h4>
          <GetAllCourses />
          </Col>
          <Col xs={12} md={3} lg={3} className="mb-4">
          <CreateNewCourse />
          </Col>
        </Row>
        </>
      )}
    </Container>
    </div>
  );
};

export default AdminDashboard;

