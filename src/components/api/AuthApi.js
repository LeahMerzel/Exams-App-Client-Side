// AuthApi.js

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
  return response.json(); 
};

const fetchUserData = async (userId) => {
  const response = await fetch(`/api/Auth/get-user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json(); 
};

export { authenticateUser, fetchUserData };
