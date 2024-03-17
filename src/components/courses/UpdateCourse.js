import React, { useState, useEffect } from "react";
import useUpdate from "../hooks/useUpdate";
import { Spinner, Alert } from "react-bootstrap";
import Form from "../forms/Form";
import useFetch from "../hooks/useFetch";

const UpdateCourse = ( {courseId} ) => {
    console.log("courseId", courseId)
    const updateCourseApiUrl = "https://localhost:7252/api/Course/update";
    const { updateEntity, isLoading: updateLoading, error: updateError } = useUpdate(updateCourseApiUrl);

    // const [courseUsers, setCourseUsers] = useState([]);
    // const [exams, setExams] = useState([]);
    // const { data: courseUsersData, isLoading: courseUsersLoading, error: courseUsersError } = useFetch(`https://localhost:7252/api/Course/${courseId}/course-users`);
    // const { data: examsData, isLoading: examsLoading, error: examsError } = useFetch(`https://localhost:7252/api/Course/${courseId}/exams`);

    // useEffect(() => {
    //     if (courseUsersData) {
    //         setCourseUsers(courseUsersData);
    //     }
    // }, [courseUsersData]);

    // useEffect(() => {
    //     if (examsData) {
    //         setExams(examsData);
    //     }
    // }, [examsData]);

    const fields = [
        { name: "CourseName", label: "Course Name", type: "text" },
        { name: "CourseDescription", label: "Course Description", type: "text" },
        { name: "CourseStartingDate", label: "Course Starting Date", type: "date" },
        { name: "CourseEndingDate", label: "Course Ending Date", type: "date" },
        // { name: "exams", label: "Exams", type: "select", options: exams.map(exam => ({ value: exam.id, label: exam.examName })) }, 
        // { name: "users", label: "Teachers", type: "select", options: courseUsers.map(user => ({ value: user.id, label: user.fullName })) }
    ];

    const onSubmit = async (formData) => {
        formData.id = courseId;
        console.log(formData.id);
        await updateEntity(formData);
    };

    // const isLoading = updateLoading || courseUsersLoading || examsLoading;
    // const error = updateError || courseUsersError || examsError;

    return (
        <div>
            {/* {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>} */}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Course"} />
        </div>
    );
};
  
export default UpdateCourse;
