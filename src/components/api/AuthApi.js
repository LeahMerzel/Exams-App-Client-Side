// AuthApi.js

const registerUser = async (userData) => {
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
  return response;
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
  // saveTokenToLocalStorage(responseData);
  return responseData;
};

const fetchUserData = async (userId) => {
  const response = await fetch(`https://localhost:7252/api/Auth/getUser/${userId}`, {

    headers: {
      // 'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  console.log("this is additional useradta in apiAuth", response)
  return response.json(); 
  //refreshToken() check setInterval
};

const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export { registerUser, authenticateUser, fetchUserData };
