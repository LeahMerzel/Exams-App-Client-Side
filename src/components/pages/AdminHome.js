// admin-home.js
import React from 'react';
import GetStarted from '../auth/GetStarted';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <GetStarted isAdmin={true}/>
    </div>
  );
};

export default AdminHome;
