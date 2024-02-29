// AuthApi.js

const registerAndLoginUser = async (userData) => {
  const response = await fetch('https://localhost:7252/api/Auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to register user');
  }

  const loginResponse = await authenticateUser(userData);
  return loginResponse;
};

const authenticateUser = async (userData) => {
  const response = await fetch('https://localhost:7252/api/Auth/login', {
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
  return responseData;
};

const fetchUserData = async (userId, token) => {
  const response = await fetch(`https://localhost:7252/api/Auth/get-user/${userId}`, {
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
