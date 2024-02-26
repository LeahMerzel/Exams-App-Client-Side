import React, { useState} from "react";
import useUpdate from "../hooks/useUpdate";
import { Spinner, Alert } from "react-bootstrap";
import Form from "../forms/Form";

const UpdateCourse = ({item}) => {
    const updateCourseApiUrl = "https://localhost:7252/api/Course/update";
    const { updateEntity, isLoading, error } = useUpdate(updateCourseApiUrl);
    const [imageFile, setImageFile] = useState(null); 

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
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });
        formDataWithImage.append("image", imageFile);
        await updateEntity(item.id, formDataWithImage);
        setImageFile(null);
    };


    return (
        <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Course"}/>
        </div>
    );
};
  
export default UpdateCourse;
