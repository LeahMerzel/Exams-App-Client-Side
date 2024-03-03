import React, {useState} from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import { useUser } from "../auth/UserContext";


const AddUserToCourse = () => {
    const getAllCoursesApiUrl = "https://localhost:7252/api/Course/get-all";
    const { data: courses, isLoading, error } = useFetch(getAllCoursesApiUrl);
    const [selectedCourse, setSelectedCourse] = useState("");

    const { userRole, user } = useUser();
    let addUserToCourse = userRole ==="Teacher" 
    ? "https://localhost:7252/api/Course/add-teacher-to-course"
    : "https://localhost:7252/api/Course/add-student-to-course"
    const { createEntity } = useCreate(addUserToCourse);

    const handleAddUserToCourse = async () => {
        try {
            if (!user) {
                return;
            }
            await createEntity({ CourseId: selectedCourse, UserId: user.userId });
        } catch (error) {
            console.error("error adding user to course: ", error)
        }
    };


return (
    <div>
    {isLoading && <Spinner animation="border" />}
    {error && <Alert variant="danger">Error: {error}</Alert>}
      {courses && (
        <div>
             <Form.Group controlId="selectCourse">
                        <Form.Label>Select a Course:</Form.Label>
                        <Form.Control as="select" onChange={(e) => setSelectedCourse(e.target.value)}>
                            <option value="">Select a course</option>
                            {courses.map(course => (
                                <option key={course.id} value={course.id}>{course.courseName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddUserToCourse}>Add User to Course</Button>
        </div>
      )}
    </div>

)

}

export default AddUserToCourse;
