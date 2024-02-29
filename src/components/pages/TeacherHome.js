// teacher-home.js
import React from 'react';
import GetStarted from '../auth/GetStarted';

const TeacherHome = () => {
  return (
    <div>
      <h1>Teacher Home</h1>
      <GetStarted userRole={1}/>
    </div>
  );
};

export default TeacherHome;
