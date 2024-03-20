import React from "react";
import useFetch from "../hooks/useFetch";
import {Card, Spinner, Alert} from "react-bootstrap";

const GetExamGradesAvg = ({examId}) => {
    const getExamGradesAvgApiUrl = `https://localhost:7252/api/Exam/average-grade/${examId}`;
    const { data: gradesAvg, isLoading, error} = useFetch(getExamGradesAvgApiUrl);

    return (
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {gradesAvg && (
                    <Alert className="mt-2" variant="primary" style={{ display: "inline-block" }}>Exam grade avarage is: {gradesAvg}</Alert>
                )}
            </Card.Body>
        </Card>
    );
};

export default GetExamGradesAvg;