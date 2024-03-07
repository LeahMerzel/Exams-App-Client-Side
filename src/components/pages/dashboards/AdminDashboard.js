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
  const { token, user, userLoggedIn } = useUser();

  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <Row>
        <Col><h3>Admin Dashboard</h3></Col>
      </Row>
      <Row>
        <Col><h4>My Info</h4>
        <GetUserData />
        </Col>
      </Row>
      {!userLoggedIn && (
        <>
        <Row>
          <Col><h4>All App Users:</h4>
          <GetAllUsers />
          </Col>
          <Col><CreateNewUser /></Col>
          </Row>
          <Row>
            <Col><h4>App's Users By Course</h4>
            <GetCourseUsers />
            </Col>
          </Row>
          <Row>
          <Col>
          <h4>All App Exams</h4>
          <GetAllExams />
          </Col>
          <Col><CreateNewExam /></Col>
        </Row>
        <Row>
          <Col>
          <h4>All App Courses</h4>
          <GetAllCourses />
          </Col>
          <Col><CreateNewCourse /></Col>
        </Row>
        </>
      )}
    </Container>
    </div>
  );
};

export default AdminDashboard;
