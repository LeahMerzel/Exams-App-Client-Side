// AuthApi.js

const registerAndLoginUser = async (userData) => {
  const response = await fetch('/api/Auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  authenticateUser(userData);
  
  return response.json();
};

const authenticateUser = async (userData) => {
  const response = await fetch('/api/Auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate user');
  }

  const responseData = await response.json();
  const { token, refreshToken } = responseData; 
  saveTokenToLocalStorage(token);
  return { userData, token, refreshToken };
};

const fetchUserData = async (userId, token) => {
  const response = await fetch(`/api/Auth/get-user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json(); 
};

const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export { registerAndLoginUser, authenticateUser, fetchUserData };
