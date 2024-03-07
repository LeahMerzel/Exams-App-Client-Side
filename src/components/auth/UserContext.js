import React, { createContext, useState, useContext, useEffect } from 'react';
import { authenticateUser, fetchUserData, registerUser } from '../api/AuthApi'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [additionalUserData, setAdditionalUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(); 
  // const [token, setToken] = useState();
  const [userRole, setUserRole] = useState(null);
  const [userCourse, setUserCourse] = useState([]);
  
  const setRole = async (role) => {
    setUserRole(role);
  }

  const setCourse = async (course) => {
    if (!userCourse.includes(course)) {
      setUserCourse([...userCourse, course]);
    }else{
      alert ("user is already in course");
    }
  };
  
  // Function to remove a course from the user's courses
  const removeCourse = async (course) => {
    setUserCourse(userCourse.filter(c => c !== course));
  };
  const login = async (userData) => {
    try {
      const response = await authenticateUser(userData);
      console.log("this is userloggedinResponse",response);
      setUserLoggedIn(true);
      setUser(response);
      // setToken(response.token)
      if (userRole === "Admin") {
        navigate('/admin-dashboard');
      } else if (userRole === "Teacher") {
        navigate('/teacher-dashboard');
      } else if (userRole === "Student") {
        navigate('/student-dashboard');
      } else {
        navigate('/');
      }
      toast.success('Login successful!');
      return response;
    } catch{
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
      if (response) {
        const { Email, Password } = userData;
        if (!userLoggedIn) {
          await login({ Email, Password });
        }
        toast.success('Registered successfully!');
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('Registration failed. Please try again.');
    }
  };
  
  const getAdditionalUserData = async (id) => {
    if (user) {
      try {
        const getAdditionalUserData = await fetchUserData(id);
        setAdditionalUserData(getAdditionalUserData);
        return getAdditionalUserData;
      } catch (error) {
        throw new Error('Error fetching additional user data:', error.message);
      }
    } else {
      throw new Error('User is not logged in');
    }
  };

  return (
    <UserContext.Provider value={{removeCourse, additionalUserData, getAdditionalUserData, setCourse, userCourse, setRole, userRole, user, userLoggedIn, login, logout, register}}> 
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