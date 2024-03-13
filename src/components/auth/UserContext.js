import React, { createContext, useState, useContext, useEffect } from 'react';
import { authenticateUser, registerUser } from '../api/AuthApi'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState(null);


  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      setUserLoggedIn(true);
      setUserRole(userData.userRole);
    }
    
  }, []);

  useEffect(() => {
    if (userRole && userLoggedIn) {
      switch (userRole) {
        case "Admin":
          navigate("/admin-dashboard");
          break;
        case "Teacher":
          navigate("/teacher-dashboard");
          break;
        case "Student":
          navigate("/student-dashboard");
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [userRole, userLoggedIn, navigate]);
    
  const login = async (loginCredentials) => {
    try {
      const response = await authenticateUser(loginCredentials);
      const { userRole } = response;
      setUserRole(userRole);
      setUserLoggedIn(true);
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      toast.success('Login successful!');
      return response;
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };
  
  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      if (response) {
        const { Email, PasswordHash } = userData;
        if (!userLoggedIn) {
          await login({ Email, PasswordHash });
        }
        toast.success('Registered successfully!');
        return response;
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('Registration failed. Please try again.');
    }
  };
    
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userCourses');
    setUser(null);
    setUserRole(null);
    setUserLoggedIn(false);
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ userRole, user, userLoggedIn, login, logout, register }}> 
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
