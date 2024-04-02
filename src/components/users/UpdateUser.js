import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Form, Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../hooks/useFetch';
import useUpdate from "../hooks/useUpdate";
import {useUser} from '../auth/UserContext';

const UpdateUser = ({ userId, onFormClose }) => {
  const {user, userRole} = useUser()
  let userid = userId? userId : user.id;
  const getUserApiUrl = `https://localhost:7252/api/User/get-by-id/${userid}`;
  const { data: userToUpdate } = useFetch(getUserApiUrl);
  console.log(userToUpdate)
  const updateUserApiUrl = `https://localhost:7252/api/Auth/update`;
  const { updateEntity, isLoading, error } = useUpdate(updateUserApiUrl);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [showModal] = useState(true);

  useEffect(() => {
    if (userToUpdate) {
      if (userRole !== "Admin")
      {
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
      formData.id = userToUpdate.id;
      const response = await updateEntity(formData);
      if (response) {
        toast.success('Update successful!');
        setShowForm(false); 
        onFormClose();
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };

  const handleModalClose = () => {
    setFormData({});
    onFormClose();
  };

  return (
    <div>
      {showForm && (
        <>
          {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          {userToUpdate && (
            <Modal show={showModal} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="mt-3" onSubmit={onSubmit}>
                  {Object.entries(formData).map(([key, value]) => (
                    <Form.Group key={key}>
                    <Form.Label>{key}</Form.Label>
                    <Form.Control
                      type="text"
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                    />
                    </Form.Group>
                  ))}
                  <Button className="mt-3" type="submit">Submit</Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
              </Modal.Footer>
            </Modal>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateUser;
