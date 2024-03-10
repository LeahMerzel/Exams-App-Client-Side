import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import { useUser } from "../auth/UserContext";
import RemoveUserFromCourse from "./RemoveUserFromCourse";

const AddUserToCourse = () => {
  const { userCourses, setCourse, user } = useUser();
  const getAllCoursesApiUrl = "https://localhost:7252/api/Course/get-all";
  const {
    data: courses,
    isLoading: coursesLoading,
    error: fetchError,
  } = useFetch(getAllCoursesApiUrl);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [addUserToCourseUrl, setAddUserToCourseUrl] = useState("");
  const [showRemoveUserModal, setShowRemoveUserModal] = useState(false);

  useEffect(() => {
    if (selectedCourse && user.id) {
      setAddUserToCourseUrl(`https://localhost:7252/api/Course/add-user-to-course/${selectedCourse},${user.id}`);
    }
  }, [selectedCourse, user.id]);

  const {
    createEntity,
    isLoading: createLoading,
    error: createError,
  } = useCreate(addUserToCourseUrl);

  const handleAddUserToCourse = async () => {
    try {
      if (!user || !selectedCourse) {
        return;
      }
      const response = await createEntity(); // Since the URL is already set, no need to pass it again
      if (response){
        setSelectedCourse(response);
        setCourse(selectedCourse); // Assuming setCourse is a function to set the user's course
      }
    } catch (error) {
      console.error("Error adding user to course: ", error);
    }
  };

  const handleRemove = () => {
    setShowRemoveUserModal(true);
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
            disabled={!selectedCourse}
          >
            Add User to Course
          </Button>
          <p>Added to Course: {selectedCourse && selectedCourse.courseName}</p>
          <p>Want to Remove from Course?</p>
          <Button onClick={handleRemove}>Remove from Course</Button>
          {showRemoveUserModal && <RemoveUserFromCourse />}
        </div>
      )}
    </div>
  );
};

export default AddUserToCourse;
