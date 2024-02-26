import React, { createContext, useState, useContext } from 'react';
import { authenticateUser, fetchUserData } from '../api/AuthApi'; 
import { createEntityAPI } from '../api/CrudApi'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // For development purposes setting to default user
  const [user, setUser] = useState({ id: 1, username: 'exampleUser' });
  const [userLoggedIn, setUserLoggedIn] = useState(true); // true for development

  const login = async (userData) => {
    setUserLoggedIn(true); // this line is for development
    try {
      const response = await authenticateUser(userData);
      setUser(response);
      setUserLoggedIn(true);
      const additionalUserData = await fetchUserData(response.id);
      // Do something with additional user data
      toast.success('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error.message);
      toast.error('Login failed. Please try again.!');
    }
  };

  const logout = () => {
    setUser('');
    setUserLoggedIn(false);
  };

  const register = async (userData) => {
    try {
      const response = await createEntityAPI(userData);
      setUser(response);
      setUserLoggedIn(true);
      toast.success('Registered successfully!');
      return { userLoggedIn: true, user: response };
    } catch (error) {
      console.error('Error registering user:', error.message);
      toast.error('Registration failed. Please try again.');
      return { userLoggedIn: false, user: null };
    }
  };


  const additionalUserData = async () => {
    if (user) {
      try {
        const additionalUserData = await fetchUserData(user.id);
        return additionalUserData;
      } catch (error) {
        throw new Error('Error fetching additional user data:', error.message);
      }
    } else {
      throw new Error('User is not logged in');
    }
  };

  return (
    <UserContext.Provider value={{ user, userLoggedIn, login, logout, register, additionalUserData }}>
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
