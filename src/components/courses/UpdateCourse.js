import React, { useState, useEffect } from "react";
import useUpdate from "../hooks/useUpdate";
import { Spinner, Alert } from "react-bootstrap";
import Form from "../forms/Form";
import useFetch from "../hooks/useFetch";

const UpdateCourse = ( courseId ) => {
    const updateCourseApiUrl = "https://localhost:7252/api/Course/update";
    const { updateEntity, isLoading: updateLoading, error: updateError } = useUpdate(updateCourseApiUrl);

    const [courseUsers, setCourseUsers] = useState([]);
    const [exams, setExams] = useState([]);
    const { data: courseUsersData, isLoading: courseUsersLoading, error: courseUsersError } = useFetch(`https://localhost:7252/api/Course/${courseId}/course-users`);
    const { data: examsData, isLoading: examsLoading, error: examsError } = useFetch(`https://localhost:7252/api/Course/${courseId}/exams`);

    useEffect(() => {
        if (courseUsersData) {
            setCourseUsers(courseUsersData);
        }
    }, [courseUsersData]);

    useEffect(() => {
        if (examsData) {
            setExams(examsData);
        }
    }, [examsData]);

    const teachers = courseUsers.filter(user => user.userRole === "Teacher");
    const students = courseUsers.filter(user => user.userRole === "Student");

    const fields = [
        { name: "courseName", label: "Course Name", type: "text" },
        { name: "courseDescription", label: "Course Description", type: "text" },
        { name: "courseStartingDate", label: "Course Starting Date", type: "date" },
        { name: "courseEndingDate", label: "Course Ending Date", type: "date" },
        { name: "exams", label: "Exams", type: "select", options: exams.map(exam => ({ value: exam.id, label: exam.name })) }, 
        { name: "teachers", label: "Teachers", type: "select", options: teachers.map(teacher => ({ value: teacher.id, label: teacher.name })) }, 
        { name: "students", label: "Students", type: "select", options: students.map(student => ({ value: student.id, label: student.name })) }     
    ];

    const onSubmit = async (formData) => {
        formData.id = courseId;
        await updateEntity(formData);
    };

    const isLoading = updateLoading || courseUsersLoading || examsLoading;
    const error = updateError || courseUsersError || examsError;

    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Course"} />
        </div>
    );
};
  
export default UpdateCourse;
