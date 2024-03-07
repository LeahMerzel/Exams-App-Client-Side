import React , {useState, useEffect} from "react";
import useCreate from "../hooks/useCreate";
import { Spinner, Alert } from "react-bootstrap";
import Form from "../forms/Form";
import useFetch from "../hooks/useFetch";

const CreateNewCourse = ({token}) => {
    const createCourseApiUrl = "https://localhost:7252/api/Course/create";
      const { createEntity, isLoading: createLoading, error: createError  } = useCreate(token, createCourseApiUrl);

      const [courseUsers, setCourseUsers] = useState([]);
      const [exams, setExams] = useState([]);
      const { data: courseUsersData, isLoading: courseUsersLoading, error: courseUsersError } = useFetch(`https://localhost:7252/api/User/get-all`);
      const { data: examsData, isLoading: examsLoading, error: examsError } = useFetch(`https://localhost:7252/api/Exam/get-all`);
  
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
      await createEntity(formData);
    };

    const isLoading = createLoading || courseUsersLoading || examsLoading;
    const error = createError || courseUsersError || examsError;

    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        <Form fields={fields} onSubmit={onSubmit} entityName={"Course"}/>
      </div>
    );
  };
  
  export default CreateNewCourse;
  
  
