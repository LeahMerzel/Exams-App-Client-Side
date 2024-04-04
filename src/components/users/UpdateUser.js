import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../hooks/useFetch';
import useUpdate from "../hooks/useUpdate";
import { useUser } from '../auth/UserContext';

const UpdateUser = ({ userId, onFormClose }) => {
  const { user, userRole } = useUser();
  let userid = userId ? userId : user.id;
  const getUserApiUrl = `https://localhost:7252/api/User/get-by-id/${userid}`;
  const { data: userToUpdate } = useFetch(getUserApiUrl);
  console.log(userToUpdate)
  const updateUserApiUrl = `https://localhost:7252/api/Auth/update`;
  const { updateEntity, isLoading, error } = useUpdate(updateUserApiUrl);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (userToUpdate) {
      if (userRole !== "Admin") {
        let { id, createdAt, userRole, courseId, teachersExams, studentsTakenExams, studentGradeAvg, ...formDataWithoutExcluded } = userToUpdate;
        setFormData(formDataWithoutExcluded);
      } else if (userRole === "Admin") {
        let { id, createdAt, courseId, teachersExams, studentsTakenExams, studentGradeAvg, ...formDataWithoutExcluded } = userToUpdate;
        setFormData(formDataWithoutExcluded);
      }
    }
  }, [userToUpdate, userRole]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const key in formData) {
        if (!formData[key]) {
          toast.error(`${key} is required.`);
          return;
        }
      }
  
      formData.id = userToUpdate.id;
      const response = await updateEntity(formData);
      if (response) {
        toast.success('Update successful!');
        onFormClose();
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };
    
  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {userToUpdate && (
        <Form onSubmit={onSubmit}>
          {Object.entries(formData).map(([key, value]) => {
            if (key === "userRole") {
              return (
                <Form.Group key={key}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    as="select"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  >
                    <option value="">Please select a user role</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Student">Student</option>
                  </Form.Control>
                </Form.Group>
              );
            } else {
              return (
                <Form.Group key={key}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              );
            }
          })}
          <br/>
          <Button className="mr-2" variant="primary" type="submit">Submit</Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateUser;
