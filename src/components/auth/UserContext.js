import React, { createContext, useState, useContext } from 'react';
import { authenticateUser, fetchUserData, registerUser } from '../api/AuthApi'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [token, setToken] = useState();
  const [userRole, setUserRole] = useState();
  
  const setRole = async (role) => {
    setUserRole(role);
  }

  const login = async (userData) => {
    try {
      const response = await authenticateUser(userData);
      setUser(response);
      setUserLoggedIn(true);
      setToken(response.token)
      if (userRole === "Admin") {
        navigate('/admin-dashboard');
      } else if (userRole === "Teacher") {
        navigate('/teacher-dashboard');
      } else if (userRole === "Student") {
        navigate('/student-dashboard');
      } else {
        navigate('/');
      }
      // const additionalUserData = await fetchUserData(response.userId, response.token);
      toast.success('Login successful!');
      return { userLoggedIn: true, user: response};
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error('Login failed. Please try again.');
    }
  };

  const logout = () => {
    setUser('');
    setUserLoggedIn(false);
  };

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      const { Email, PasswordHash } = userData;
      if (response) {
        toast.success('Registered successfully!');
        await login({ Email, PasswordHash });
      }
      // setUser(response);
      // setUserLoggedIn(true);
      // return { userLoggedIn: true, user: response };
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('Registration failed. Please try again.');
      return { userLoggedIn: false, user: null };
    }
  };  


  // const additionalUserData = async () => {
  //   if (user) {
  //     try {
  //       const additionalUserData = await fetchUserData(user.id);
  //       return additionalUserData;
  //     } catch (error) {
  //       throw new Error('Error fetching additional user data:', error.message);
  //     }
  //   } else {
  //     throw new Error('User is not logged in');
  //   }
  // };

  return (
    <UserContext.Provider value={{ setRole, userRole, token, user, userLoggedIn, login, logout, register}}> 
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
