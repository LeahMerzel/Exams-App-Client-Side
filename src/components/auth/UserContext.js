import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, registerUser} from '../api/AuthApi';
import { fetchCourseById } from '../api/CourseUsersApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState(null);
  const [userCourse, setUserCourse] = useState(null);
  const [studentExamId, setStudentExamId] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userCourseString = localStorage.getItem('userCourse'); // Retrieve userCourse from localStorage

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUser(userData);
      setUserLoggedIn(true);
      setUserRole(userData.userRole);
    }

    if (userCourseString) {
      const courseData = JSON.parse(userCourseString);
      setUserCourse(courseData);
    }
  }, []);

  const setUserCourseAfterLogin = async (courseId) => {
    const response = await fetchCourseById(courseId);
    setUserCourse(response);
    localStorage.setItem('userCourse', JSON.stringify(response));
  }
    
  const login = async (loginCredentials) => {
    try {
      const response = await authenticateUser(loginCredentials);
      const { userRole } = response;
      setUserRole(userRole);
      setUserLoggedIn(true);
      setUser(response);
      localStorage.setItem('user', JSON.stringify(response));
      setUserCourseAfterLogin(response.courseId);
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
    localStorage.removeItem('userCourse'); // Remove userCourse from localStorage upon logout
    setUser(null);
    setUserRole(null);
    setUserLoggedIn(false);
    setUserCourse(null); // Set userCourse to null upon logout
    navigate('/');
  };

  const setCourse = (course) =>{
    setUserCourse(course);
  };

  const setExamId = (exam) =>{
    setStudentExamId(exam);
  }

  return (
    <UserContext.Provider value={{ setExamId, studentExamId, setCourse, userCourse, userRole, user, userLoggedIn, login, logout, register }}> 
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
