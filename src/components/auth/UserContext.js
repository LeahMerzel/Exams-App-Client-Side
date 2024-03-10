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
  const [userRole, setUserRole] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [redirected, setRedirected] = useState(false); // Flag to track redirection

  console.log("userCourses:",userCourses)


  useEffect(() => {
    if (userRole && !redirected) {
      console.log("User role before navigation:", userRole);
      if (userRole === "Admin") {
        navigate("/admin-dashboard");
      } else if (userRole === "Teacher") {
        navigate("/teacher-dashboard");
      } else if (userRole === "Student") {
        navigate("/student-dashboard");
      } else {
        navigate('/');
      }
      setRedirected(true); // Set the flag to true after redirection
    }
  }, [userRole, navigate, redirected]);

  const setRole = async (role) => {
    setUserRole(role);
  }

  const setCourse = (course) => {
    if (!userCourses.includes(course)) {
      setUserCourses([...userCourses, course]);
    } else {
      alert("User is already in course");
    }
  };
  
  const removeCourse = async (course) => {
    setUserCourses(userCourses.filter(c => c !== course));
  };

  const login = async (userData) => {
    try {
      const response = await authenticateUser(userData);
      setUserLoggedIn(true);
      setUser(response);
      await setRole(response.userRole);
      console.log("response courses", response.courses)
      if (response.courses) {
        // Map over the courses and extract the course name or ID
        const courses = response.courses.map(course => course.name); // or course.id depending on your API response
        setUserCourses(courses? courses: []); // Set the userCourses state with the list of course names or IDs
      }
      toast.success('Login successful!');
      return response;
    } catch {
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
        const { Email, PasswordHash } = userData;
        if (!userLoggedIn) {
          await login({ Email, PasswordHash });
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
        const additionalUserData = await fetchUserData(id);
        setAdditionalUserData(additionalUserData);
        return additionalUserData;
      } catch (error) {
        throw new Error('Error fetching additional user data:', error.message);
      }
    } else {
      throw new Error('User is not logged in');
    }
  };

  return (
    <UserContext.Provider value={{ removeCourse, additionalUserData, getAdditionalUserData, setCourse, userCourses, setRole, userRole, user, userLoggedIn, login, logout, register }}> 
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
