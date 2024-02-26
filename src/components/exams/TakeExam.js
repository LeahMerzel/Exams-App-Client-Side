import React, { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import FetchQuestionAnswers from "./questions/FetchQuestionAnswers";
import useFetch from "../hooks/useFetch";

const TakeExam = ({ exam }) => {
  const examQuestionApiUrl = `https://localhost:7252/api/Exam/${exam.id}/questions`;
  const { data: examQuestions, isLoading, error } = useFetch(examQuestionApiUrl);
  const [setSelectedAnswers] = useState({});

  useEffect(() => {
    if (error) {
      console.error("Error fetching exam questions:", error);
    }
  }, [error]);

  const handleAnswerSelection = (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerId,
    }));
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {examQuestions &&
        examQuestions.map((question) => (
          question && question.id && ( 
            <div key={question.id}>
              <h3>{question.name}</h3>
              <p>{question.description}</p>
              <FetchQuestionAnswers
                question={question}
                onSelectAnswer={(answerId) =>
                  handleAnswerSelection(question.id, answerId)
                }
              />
            </div>
          )
        ))}
    </div>
  );
};

export default TakeExam;
