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
  const [studentExam, setStudentExam] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem('user');
    const userCourseString = localStorage.getItem('userCourse'); 

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
      const { id, userRole } = response; 
      if (userRole){
        setUserRole(userRole);
      }
      setUserLoggedIn(true);
      setUser({ id, userRole }); 
      localStorage.setItem('user', JSON.stringify({ id, userRole })); 
      setUserCourseAfterLogin(response.courseId);
      toast.success('Login successful!');
      return response;
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };
    
  useEffect(() => {
    if (userRole) {
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
    }, [userRole]);


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
    localStorage.removeItem('userCourse'); 
    setUser(null);
    setUserRole(null);
    setUserLoggedIn(false);
    setUserCourse(null); 
    navigate('/');
  };

  const setCourse = (course) =>{
    setUserCourse(course);
  };

  const setExam = (exam) =>{
    setStudentExam(exam);
  }

  return (
    <UserContext.Provider value={{ studentExam, setExam, setCourse, userCourse, userRole, user, userLoggedIn, login, logout, register }}> 
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
