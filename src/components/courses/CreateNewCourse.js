import React from "react";
import useCreate from "../hooks/useCreate";
import { Spinner, Alert } from "react-bootstrap";
import Form from "../forms/Form";

const CreateNewCourse = () => {
    const createCourseApiUrl = "https://localhost:7252/api/Course/create";
    const { createEntity, isLoading, error  } = useCreate(createCourseApiUrl);
  
    const fields = [
        { name: "courseName", label: "Course Name", type: "text" },
        { name: "courseDescription", label: "Course Description", type: "text" },
        { name: "courseStartingDate", label: "Course Starting Date", type: "date" },
        { name: "courseEndingDate", label: "Course Ending Date", type: "date" },
        { name: "exams", label: "Exams", type: "select", options: [] }, 
        { name: "teachers", label: "Teachers", type: "select", options: [] }, 
        { name: "students", label: "Students", type: "select", options: [] }     
      ];
      
    const onSubmit = async (formData) => {
      await createEntity(formData);
    };

    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        <Form fields={fields} onSubmit={onSubmit} entityName={"Course"}/>
      </div>
    );
  };
  
  export default CreateNewCourse;
  
  
