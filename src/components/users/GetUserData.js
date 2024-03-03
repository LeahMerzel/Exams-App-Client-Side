import React, { useEffect, useState } from 'react';
import { useUser } from '../auth/UserContext';
import useFetch from '../hooks/useFetch';
import Button from 'react-bootstrap/Button';
import UpdateUser from './UpdateUser';
import { Spinner, Alert } from "react-bootstrap";

const GetUserData = () => {
  const { user, logout, token } = useUser();
  const getUserDataApiUrl = `https://localhost:7252/api/Auth/get-user-data/${user.userId}`;
  const { data: userData, isLoading, error } = useFetch(token, getUserDataApiUrl);
  const [showUpdateUser, setShowUpdateUser] = useState(false);

  const handleEdit = () => {
    setShowUpdateUser(true);
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {userData && (
        <>
          <h2>Welcome, {userData.userName}!</h2>
          <p>User Details:</p>
          <p>Username: {userData.userName}</p>
          <p>Full Name: {userData.fullName}</p>
          <p>Email: {userData.email}</p>
          {!showUpdateUser && (
          <Button onClick={handleEdit} style={{marginRight: '10px'}}>Edit User Details</Button>
          )}
          <Button onClick={logout}>Logout</Button>
          {showUpdateUser && <UpdateUser userToUpdate={userData} />}
        </>
      )} 
    </div>
  );
};

export default GetUserData;
