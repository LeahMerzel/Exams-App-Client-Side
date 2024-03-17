import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { useUser } from "../auth/UserContext";
import { addUserToCourse } from "../api/CourseUsersApi";
import RemoveUserFromCourse from "./RemoveUserFromCourse";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUserToCourse = () => { 
  const { userCourse, setCourse, user } = useUser();
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
      if (userCourse !== ""){
        alert("You are already subscribed to a course.");
        return;
      }
      setCreateLoading(true);
      setCreateError("");
      const response = await addUserToCourse(selectedCourse, user.id);
      setCourse(response);
      localStorage.setItem('userCourse', JSON.stringify(response));
      setSelectedCourse("");
      toast.success("user added to the course")
    } catch (error) {
      setCreateError(error.message);
      toast.error("user was not added")
    } finally {
      setCreateLoading(false);
    }
  };

  const handleRemove = () => {
    setShowRemoveUser(true);
  };

  const handleRemoveConfirmation = () => {
    setShowRemoveUser(false); 
  };

  return (
    <div>
      {userCourse && (
        <div>
          <Alert variant="primary">You are successfully enrolled in course {userCourse.courseName}</Alert>
          <p>Want to remove from the course?</p>
          <Button onClick={handleRemove}>Remove from Course</Button>
          {showRemoveUser && <RemoveUserFromCourse onRemoveConfirmation={handleRemoveConfirmation}/>}
        </div>
      )}
      {userCourse === "" && (
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddUserToCourse;
