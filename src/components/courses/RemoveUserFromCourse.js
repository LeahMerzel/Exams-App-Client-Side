import React, { useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { useUser } from "../auth/UserContext";
import { deleteUserFromCourse } from '../api/CourseUsersApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RemoveUserFromCourse = ({ onRemoveConfirmation }) => {
  const { userCourse, setCourse, user } = useUser();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [removedSuccessfully, setRemovedSuccessfully] = useState(false); 

  const handleRemoveUserFromCourse = async () => {
    try {
      if (!userCourse || !user || !userCourse.id) { 
        return;
      }
      setDeleteLoading(true);
      setDeleteError("");
      await deleteUserFromCourse(userCourse.id, user.id);
      setCourse(null);
      setRemovedSuccessfully(true);
      localStorage.setItem('userCourse', JSON.stringify(""));
      toast.success("user removed from course")
    } catch (error) {
      setDeleteError(error.message);
      toast.error("user was not removed")
    } finally {
      onRemoveConfirmation();
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
      {!userCourse && removedSuccessfully && (
        <Alert variant="info">
          User removed from course successfully. You must add yourself to a course.
        </Alert>
      )}
      {userCourse && (
        <div>
          <p>Currently subscribed to: {userCourse.courseName}</p>
          <Button
            variant="danger"
            onClick={handleRemoveUserFromCourse}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Removing..." : "Remove User from Course"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RemoveUserFromCourse;


