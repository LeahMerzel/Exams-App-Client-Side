// teacher-home.js
import React, {useEffect} from 'react';
import GetStarted from '../auth/GetStarted';
import { useUser } from '../auth/UserContext';

const TeacherHome = () => {
  const role = "Teacher";
  const {user, setRole } = useUser();
  useEffect(() => {
    setRole(role);
  }, [setRole, role]); 
  console.log("this is user in home", user);
  return (
    <div>
      <h1>Teacher Home</h1>
      <GetStarted />
    </div>
  );
};

export default TeacherHome;
