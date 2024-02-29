// student-home.js
import React from 'react';
import GetStarted from '../auth/GetStarted';

const StudentHome = () => {
  return (
    <div>
      <h1>Student Home</h1>
      <GetStarted userRole={2}/>
    </div>
  );
};

export default StudentHome;
