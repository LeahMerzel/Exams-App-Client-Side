import React, { useState } from 'react';
import GetAllExams from '../../exams/GetAllExams';
import GetUserData from '../../users/GetUserData';
import { useUser } from '../../auth/UserContext';
import CreateNewExam from '../../exams/CreateNewExam';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddUserToCourse from '../../courses/AddUserToCourse';
import GetCourseUsers from '../../courses/GetCourseUsers';
import GetUserCourse from '../../users/GetUserCourse';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const { userCourse, userLoggedIn } = useUser();
  const [showCreateExam, setShowCreateExam] = useState(false);
  const navigate = useNavigate();

  const handleCreateExam = () => {
    setShowCreateExam(true);
    navigate("/create-new-exam");
  }

  return (
    <Container className="align-items-center mt-3 mb-5 p-3">
      <h3>Teacher Dashboard</h3>
      <br/>
      {userLoggedIn && (
        <>
          <Row>
            <Col xs={12} md={3} lg={3} className="mb-5">
              <h4>Manage Teacher's Course</h4>
              <AddUserToCourse/>
            </Col>
            {userCourse && (
              <>
                  <Col xs={12} md={9} lg={9} className="mb-5">
                  <h4>My Info</h4>
                  <GetUserData />
                  </Col>
                    <Row>
                    <Col xs={12} md={12} lg={12} className="mb-5">
                      <h4>My Exams:</h4>
                      <GetAllExams />
                    </Col>
                    <Col xs={12} md={6} lg={6} className="mb-5">
                      <h4>Create New Exam</h4>
                      <Button onClick={handleCreateExam}>Create Exam</Button>
                      {showCreateExam && <CreateNewExam />}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={12} lg={12} className="mb-5">
                      <h4>The Course I Teach In</h4>
                      <GetUserCourse />
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
