import React, {useState} from 'react';
import GetAllCourses from '../../courses/GetAllCourses';
import { useUser } from '../../auth/UserContext';
import CreateNewCourse from '../../courses/CreateNewCourse';
import CreateNewUser from '../../users/CreateNewUser';
import { Container, Row, Col, Button } from 'react-bootstrap';
import GetAllUsers from '../../users/GetAllUsers';
import GetUserData from '../../users/GetUserData';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { userLoggedIn } = useUser();
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const navigate = useNavigate();

  const handleCreateUser = () => {
    setShowCreateUser(true);
    navigate("/create-new-user");
  }

  const handleCreateCourse = () => {
    setShowCreateCourse(true);
    navigate("/create-new-course");
  }

  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <Row>
        <Col><h3>Admin Dashboard</h3></Col>
        <br/>
      </Row>
      {userLoggedIn && (
        <>
      <Row>
        <Col xs={12} md={9} lg={9} className="mt-3 mb-5">
        <h4>Admin Data:</h4>
        <GetUserData />
        </Col>
      </Row>
        <Row>
          <Col xs={12} md={9} lg={9} className="mb-5">
          <h4>All App Users:</h4>
          <GetAllUsers />
          </Col>
          <Col xs={12} md={3} lg={3} className="mb-5">
          <h4>Create New User</h4>
          <Button onClick={handleCreateUser}>Create User</Button>
          {showCreateUser && <CreateNewUser />}
          </Col>
        </Row>
        <Row>
        <Col xs={12} md={9} lg={9} className="mb-5">
            <h4>App's Courses</h4>
            <GetAllCourses />
            </Col>
            <Col xs={12} md={3} lg={3} className="mb-5">
          <h4>Create New Course</h4>
          <Button onClick={handleCreateCourse}>Create Course</Button>
          {showCreateCourse && <CreateNewCourse  />}
          </Col>
        </Row>
        </>
      )}
    </Container>
    </div>
  );
};

export default AdminDashboard;

