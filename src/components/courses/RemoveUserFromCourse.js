import React, { useState, useEffect } from "react";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import { useUser } from "../auth/UserContext";
import { deleteUserFromCourse } from "../api/CourseUsersApi";
import { useUserCourses } from "./UserCoursesContext";

const RemoveUserFromCourse = () => {
  const { user } = useUser();
  const { userCourses , setCourseUsersChanged } = useUserCourses();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [removedCourseName, setRemovedCourseName] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (selectedCourse && userCourses) {
      const selectedCourseObj = userCourses.find(course => course.id === selectedCourse);
      if (selectedCourseObj) {
        setRemovedCourseName(selectedCourseObj.courseName);
      }
    }
  }, [selectedCourse, userCourses]);

  const handleRemoveUserFromCourse = async () => {
    try {
      if (!user || !selectedCourse) {
        return;
      }
      setDeleteLoading(true);
      setDeleteError("");
      await deleteUserFromCourse(selectedCourse, user.id);
      setCourseUsersChanged(true);
      setSelectedCourse("");
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {deleteLoading && <Spinner animation="border" />}
      {deleteError && (
        <Alert variant="danger">
          Error removing user from course: {deleteError}
        </Alert>
      )}
      {userCourses && (
        <div>
          <Form.Group controlId="selectCourse">
            <Form.Label>Select a Course:</Form.Label>
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
          <p>Removed from Course: {removedCourseName}</p>
        </div>
      )}
    </div>
  );
};

export default RemoveUserFromCourse;
