import React from "react";
import useFetch from "../../hooks/useFetch";
import { Spinner, Alert, Card } from "react-bootstrap";

const GetQuestionsFailed = ({ studentExamId }) => {
    const getQuestionsFailedApiUrl = `https://localhost:7252/api/StudentExam/questions-failed/${studentExamId}`;
    const { data: questionsFailed, isLoading, error } = useFetch(getQuestionsFailedApiUrl);
    console.log(questionsFailed)
    return (
        <>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {questionsFailed && questionsFailed.map((question, index) => (
                <Card key={index} className="mb-3">
                    <Card.Body>
                        <Card.Title>Question Number: {question.questionNumber}</Card.Title>
                        <Card.Title>Question Description: {question.questionDescription}</Card.Title> 
                        <Card.Text>Chosen Answer Number: {question.chosenWrongAnswerNumber}</Card.Text>
                        <Card.Text>Chosen Answer Description: {question.chosenWrongAnswerDescription}</Card.Text>
                        <Card.Text>Question Scoring: -{question.questionScoring}</Card.Text>
                        <Card.Text>Correct Answer: {question.correctAnswerDescription}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
};

export default GetQuestionsFailed;
