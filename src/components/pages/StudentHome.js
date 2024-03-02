// student-home.js
import React, {useEffect} from 'react';
import GetStarted from '../auth/GetStarted';
import { useUser } from '../auth/UserContext';

const StudentHome = () => {
  const role = "Student";
  const { setRole } = useUser();
  useEffect(() => {
    setRole(role);
  }, [setRole, role]);    

  return (
    <div>
      <h1>Student Home</h1>
      <GetStarted />
    </div>
  );
};

export default StudentHome;
