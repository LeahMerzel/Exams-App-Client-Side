import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import { useUser } from "../auth/UserContext";
import RemoveUserFromCourse from "./RemoveUserFromCourse";

const AddUserToCourse = () => {
  const { userCourse, setCourse, user } = useUser();
  const getAllCoursesApiUrl = "https://localhost:7252/api/Course/get-all";
  const {
    data: courses,
    isLoading: coursesLoading,
    error: fetchError,
  } = useFetch(getAllCoursesApiUrl);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [addUserToCourseUrl, setAddUserToCourseUrl] = useState("");

  useEffect(() => {
    if (selectedCourse && user) {
      setAddUserToCourseUrl(`https://localhost:7252/api/Course/add-user-to-course/${selectedCourse},${user.userId}`);
    }
  }, [selectedCourse, user]);

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
      const response = await createEntity(addUserToCourseUrl);
      if (response){
        setCourse(...userCourse, selectedCourse);
      }
    } catch (error) {
      console.error("Error adding user to course: ", error);
    }
  };
  
  const handleRemove = () => {
    return <RemoveUserFromCourse />
  }

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
          <p>Added to Course: ${userCourse}</p>
          <p>Want to Remove from Course?</p>
          <Button onClick={handleRemove()}>Remove from Course</Button>
        </div>
      )}
    </div>
  );
};

export default AddUserToCourse;
