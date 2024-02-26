// AuthApi.js
const registerUser = async (userData) => {
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

  return { token, refreshToken };
};

const fetchUserData = async (userId) => {
  const response = await fetch(`/api/Auth/get-user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json(); 
};

export { registerUser, authenticateUser, fetchUserData };
