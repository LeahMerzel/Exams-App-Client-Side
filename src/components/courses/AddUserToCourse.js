import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { useUser } from "../auth/UserContext";
import { addUserToCourse } from "../api/CourseUsersApi";
import RemoveUserFromCourse from "./RemoveUserFromCourse";
import { useUserCourses } from "./UserCoursesContext";

const AddUserToCourse = () => {
  const { user } = useUser();
  const { setCourseUsersChanged } = useUserCourses();
  const getAllCoursesApiUrl = "https://localhost:7252/api/Course/get-all";
  const {
    data: courses,
    isLoading: coursesLoading,
    error: fetchError,
  } = useFetch(getAllCoursesApiUrl);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [addedCourseName, setAddedCourseName] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [showRemoveUser, setShowRemoveUser] = useState(false);

  useEffect(() => {
    if (selectedCourse && courses) {
      const selectedCourseObj = courses.find(course => course.id === selectedCourse);
      if (selectedCourseObj) {
        setAddedCourseName(selectedCourseObj.courseName);
      }
    }
  }, [selectedCourse, courses]);

  const handleAddUserToCourse = async () => {
    try {
      if (!user || !selectedCourse) {
        return;
      }
      setCreateLoading(true);
      setCreateError("");
      await addUserToCourse(selectedCourse, user.id);
      setCourseUsersChanged(true);
      setSelectedCourse("");
    } catch (error) {
      setCreateError(error.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleRemove = () => {
    setShowRemoveUser(true);
  };

  return (
    <div>
      {(coursesLoading || createLoading) && <Spinner animation="border" />}
      {fetchError && (
        <Alert variant="danger">Error fetching courses: {fetchError}</Alert>
      )}
      {createError && (
        <Alert variant="danger">
          Error adding user to course: {createError}
        </Alert>
      )}
      {courses && (
        <div>
          <Form.Group controlId="selectCourse">
            <Form.Label>Select a Course:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => setSelectedCourse(e.target.value)}
              value={selectedCourse}
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.courseName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleAddUserToCourse}
            disabled={!selectedCourse || createLoading}
          >
            Add User to Course
          </Button>
          <p>Added to Course: {addedCourseName}</p>
          <p>Want to Remove from Course?</p>
          <Button onClick={handleRemove}>Remove from Course</Button>
          {showRemoveUser && <RemoveUserFromCourse />}
        </div>
      )}
    </div>
  );
};

export default AddUserToCourse;
