// CourseUsersApi.js

export const fetchCourseUsers = async (courseId, userId) => {
  try {
    const response = await fetch(`https://localhost:7252/api/Course/${courseId}/course-users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const courseUsersData = await response.json();
    const userCourses = courseUsersData.filter(user => user.id === userId);
    if (userCourses.length > 0) {
      return userCourses[0].courses;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching course users:', error);
    return [];
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
  console.log("response in courseApi", response);
  return response;
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

