// CourseUsersApi.js

export const fetchCourseById = async (courseId) => {
  try {
    const response = await fetch(`https://localhost:7252/api/Course/get-by-id/${courseId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch course by courseId');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching course by id:', error);
    return '';
  }
};

export const fetchCourseUsers = async (courseId) => {
  try {
    const response = await fetch(`https://localhost:7252/api/Course/${courseId}/course-users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching course users:', error);
    return '';
  }
};

export const addUserToCourse = async (courseId, userId) => {
  const response = await fetch(`https://localhost:7252/api/Course/add-user-to-course/${courseId},${userId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to add user to course');
  }
  return response.json();
};

export const deleteUserFromCourse = async (courseId, userId) => {
  const response = await fetch(`https://localhost:7252/api/Course/remove-user-from-course/${courseId},${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user from course');
  }
  return response;
};

