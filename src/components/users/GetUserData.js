import React, { useState } from 'react';
import { useUser } from '../auth/UserContext';
import useFetch from '../hooks/useFetch';
import Button from 'react-bootstrap/Button';
import UpdateUser from './UpdateUser';
import { Spinner, Alert, Card } from "react-bootstrap";

const GetUserData = () => {
  const { user, logout } = useUser();
  const getUserDataApiUrl = user ? `https://localhost:7252/api/Auth/user/${user.id}` : '';
  const { data: userData, isLoading, error, refetch } = useFetch(getUserDataApiUrl);
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  const handleFormClose = () => {
    refetch();
    setShowUpdateUser(false);
  };

  const handleEdit = () => {
    setShowUpdateUser(true);
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {userData && (
        <Card bg="light">
          <Card.Body>
            <Card.Title>Welcome, {userData.userName}!</Card.Title>
            <Card.Text>User Details:</Card.Text>
            <Card.Text>Username: {userData.userName}</Card.Text>
            <Card.Text>Full Name: {userData.fullName}</Card.Text>
            <Card.Text>Email: {userData.email}</Card.Text>
            <Button onClick={handleEdit} style={{ marginRight: '10px' }}>Edit User Details</Button>
            <Button onClick={logout}>Logout</Button>
            {showUpdateUser && <UpdateUser userId={userData.id} onFormClose={handleFormClose}/>}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default GetUserData;
