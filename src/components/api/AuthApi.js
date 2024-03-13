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
  const responseUserData = await response.json();
  saveUserToLocalStorage(responseUserData);
  return responseUserData;
};

const saveUserToLocalStorage = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
};


export { registerUser, authenticateUser };
