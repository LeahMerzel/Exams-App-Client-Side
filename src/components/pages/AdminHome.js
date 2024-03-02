// admin-home.js
import React , {useEffect} from 'react';
import GetStarted from '../auth/GetStarted';
import { useUser } from '../auth/UserContext';

const AdminHome = () => {
const role = "Admin";
const { setRole } = useUser();
useEffect(() => {
  setRole(role);
}, [setRole, role]); 
  return (
    <div>
      <h1>Admin Home</h1>
      <GetStarted />
    </div>
  );
};

export default AdminHome;
