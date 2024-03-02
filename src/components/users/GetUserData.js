import React, { useEffect } from 'react';
import { useUser } from '../auth/UserContext';
import useFetch from '../hooks/useFetch';
import Button from 'react-bootstrap/Button';
import DataTable from '../filterableTable/DataTable';
import useFilterableTable from "../hooks/useFilterableTable";
import UpdateUser from './UpdateUser';
import { Spinner, Alert } from "react-bootstrap";

const GetUserData = () => {
  const { user, logout, token } = useUser();
  const getUserDataApiUrl = user ? `https://localhost:7252/api/Auth/get-user/${user.userId}` : null;
  const { data: userData, isLoading, error, fetchData } = useFetch(token);

  useEffect(() => {
    if (user && getUserDataApiUrl) {
      fetchData(getUserDataApiUrl);
    }
  }, [user, getUserDataApiUrl, fetchData]);

  const { filteredData } = useFilterableTable(userData || []);

  const handleEdit = (item) => {
    return <UpdateUser item={item} />;
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {user && (
        <>
          <h2>Welcome, {user.userName}!</h2>
          <p>User Details:</p>
          {userData && (
            <div>
              <DataTable data={filteredData} onEdit={handleEdit} />
            </div>
          )}
          <Button onClick={logout}>Logout</Button>
        </>
      )} 
    </div>
  );
};

export default GetUserData;
