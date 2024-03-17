import React, { useEffect, useState } from "react";
import { Spinner, Card } from "react-bootstrap";
import { useUser } from '../auth/UserContext';

const GetUserCourse = () => {
    const { userCourse } = useUser();
    const [isLoading, setIsLoading] = useState(!userCourse); 

    useEffect(() => {
        if (userCourse) {
            setIsLoading(false);
        }
    }, [userCourse]);
  
    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {userCourse && !isLoading && (
                <Card bg="light">
                    <Card.Body>
                        <Card.Title>The Course I'm Subscribed to: {userCourse.courseName}</Card.Title>
                        <Card.Text>{userCourse.courseDescription}</Card.Text>
                        <Card.Text>Starting Date: {userCourse.courseStartingDate}</Card.Text>
                        <Card.Text>Ending Date: {userCourse.courseEndingingDate}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default GetUserCourse;
