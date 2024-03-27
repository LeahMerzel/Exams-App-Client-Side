import React  from "react";
import useCreate from "../hooks/useCreate";
import { Spinner, Alert, Button } from "react-bootstrap";
import Form from "../forms/Form";
import { useNavigate } from "react-router-dom";

const CreateNewCourse = () => {
    const createCourseApiUrl = "https://localhost:7252/api/Course/create";
      const { createEntity, isLoading, error } = useCreate(createCourseApiUrl);
      const navigate = useNavigate();

      const fields = [
          { name: "courseName", label: "Course Name", type: "text" },
          { name: "courseDescription", label: "Course Description", type: "text" },
          { name: "courseStartingDate", label: "Course Starting Date", type: "date" },
          { name: "courseEndingDate", label: "Course Ending Date", type: "date" }
      ];
  
      
    const onSubmit = async (formData) => {
      await createEntity(formData);
    };

    const handleGoBack = () => {
      navigate("/admin-dashboard");
    };  

    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        <Form fields={fields} onSubmit={onSubmit} entityName={"Course"}/>
        <Button variant="link" onClick={handleGoBack} className="mr-2">Go Back</Button>
      </div>
    );
  };
  
  export default CreateNewCourse;
  
  
