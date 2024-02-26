import React from 'react';
import { useUser } from '../auth/UserContext';
import useFetch from '../hooks/useFetch';
import Button from 'react-bootstrap/Button';
import DataTable from '../filterableTable/DataTable';
import useFilterableTable from "../hooks/useFilterableTable";
import UpdateUser from './UpdateUser';
import { Spinner, Alert } from "react-bootstrap";

const GetUserData = ({forUser}) => {
  const { user, login, logout } = useUser(forUser);
  const getUserDataApiUrl = `https://localhost:7252/api/Auth/get-user/${user.Id}`;
  const { data: userData, isLoading, error } = useFetch(getUserDataApiUrl);
  const { filteredData } = useFilterableTable(userData || []);

  const handleEdit = (item) => {
    <UpdateUser item={item} />;
  };

return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {user ? 
        <>
          <h2>Welcome, {user.userName}!</h2>
          <p>User Details:</p>
            {userData && (
            <div>
            <DataTable data={filteredData} onEdit={handleEdit} />
            </div>
            )
          }
          <Button onClick={logout}>Logout</Button>
        </>
        : (
        <div>
        <p>Please login to view user details.</p>
        <Button onClick={() => login(user)}>Login</Button>
        </div>
      )}
    </div>
  );
};

export default GetUserData;
