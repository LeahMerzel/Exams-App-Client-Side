import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import GetUpcomingExams from '../exams/GetUpcomingExams';
import { Button, Alert, Spinner} from "react-bootstrap";

const GetStudentCourses = ({ token, studentId }) => {
    const getStudentCoursesApiUrl = `https://localhost:7252/api/User/${studentId}/student-courses`;
    const { data: studentCourses, isLoading, error } = useFetch(getStudentCoursesApiUrl, token);
    const [ getUpcomingExams, setGetUpcomingExams ] = useState(false);

    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            {studentCourses && (
                <div>
                    {studentCourses.map(course => (
                        <div key={course.id}>
                            <h4>{course.name}</h4>
                            <p>{course.description}</p>
                            <h4>{course.startingDate}</h4>
                            <h4>{course.endingDate}</h4>
                            <Button onClick={setGetUpcomingExams(true)}>Upcoming Exams</Button>
                            {getUpcomingExams &&
                            <div>
                                <h4>Upcoming Exams - {course.name}</h4>
                                <GetUpcomingExams courseId={course.id} />
                            </div>
                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GetStudentCourses;
