import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { useUser } from "../auth/UserContext";
import useDelete from "../hooks/useDelete"; 

const RemoveUserFromCourse = () => {
  const { user } = useUser();
  const getUserCoursesApiUrl = `https://localhost:7252/api/User/${user.userId}/user-courses`;
  const {
    data: userCourses,
    isLoading: coursesLoading,
    error: fetchError,
  } = useFetch(getUserCoursesApiUrl);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [removeUserFromCourseUrl, setRemoveUserFromCourseUrl] = useState("");

  useEffect(() => {
    if (selectedCourse && user) {
      setRemoveUserFromCourseUrl(`https://localhost:7252/api/Course/remove-user-from-course/${selectedCourse.id},${user.userId}`);
    }
  }, [selectedCourse, user]);

  const {
    deleteEntity,
    isLoading: deleteLoading,
    error: deleteError,
  } = useDelete(removeUserFromCourseUrl);

  const handleRemoveUserFromCourse = async () => {
    try {
      await deleteEntity();
      setSelectedCourse(""); 
    } catch (error) {
      console.error("Error removing user from course: ", error);
    }
  };

  return (
    <div>
      {coursesLoading && <Spinner animation="border" />}
      {fetchError && (
        <Alert variant="danger">Error fetching user courses: {fetchError}</Alert>
      )}
      {deleteError && (
        <Alert variant="danger">
          Error removing user from course: {deleteError}
        </Alert>
      )}
      {userCourses && (
        <div>
          <Form.Group controlId="selectCourse">
            <Form.Label>Select a Course to Remove:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedCourse(e.target.value)}
              value={selectedCourse}
            >
              <option value="">Select a course</option>
              {userCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="danger"
            onClick={handleRemoveUserFromCourse}
            disabled={!selectedCourse || deleteLoading}
          >
            {deleteLoading ? "Removing..." : "Remove User from Course"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RemoveUserFromCourse;
