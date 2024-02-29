// admin-home.js
import React from 'react';
import GetStarted from '../auth/GetStarted';

const AdminHome = () => {
  return (
    <div>
      <h1>Admin Home</h1>
      <GetStarted userRole={0}/>
    </div>
  );
};

export default AdminHome;
