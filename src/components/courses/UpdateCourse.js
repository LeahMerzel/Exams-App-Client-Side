import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import useUpdate from "../hooks/useUpdate";
import useFetch from "../hooks/useFetch";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateCourse = ({ courseId, onUpdateSuccess, onHideModal }) => {
  const getCourseApiUrl = `https://localhost:7252/api/Course/get-by-id/${courseId}/`;
  const { data: course, isLoading: isLoadingCourse, error: courseError } = useFetch(getCourseApiUrl);
  const updateCourseApiUrl = "https://localhost:7252/api/Course/update";
  const { updateEntity, isLoading: isLoadingUpdate, error: updateError } = useUpdate(updateCourseApiUrl);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (course) {
      const { exams, ...courseDataWithoutExams } = course;
      setFormData(courseDataWithoutExams);
    }
  }, [course]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.courseName || !formData.courseStartingDate) {
        toast.error('Field is required.');
        return;
      }
      await updateEntity(formData);
      onUpdateSuccess(); 
      onHideModal();
    } catch (error) {
      console.error('Update failed:', error.message);
    }
  };

  if (isLoadingCourse || isLoadingUpdate) return <Spinner animation="border" />;
  if (courseError || updateError) return <Alert variant="danger">Error: {courseError || updateError}</Alert>;

  if (!course) return null;

  const excludedProperties = ['id', 'createdAt'];

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {Object.entries(formData)
        .filter(([key]) => !excludedProperties.includes(key))
        .map(([key, value]) => (
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
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default UpdateCourse;
