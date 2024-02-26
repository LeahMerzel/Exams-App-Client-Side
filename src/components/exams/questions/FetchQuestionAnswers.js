import React, { useState } from "react";
import { Form, FormGroup, Spinner, Alert } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const FetchQuestionAnswers = ({ question, onSelectAnswer }) => {
  const getQuestionAnswersApiUrl = `https://localhost:7252/api/Question/${question.id}/answers`;
  const { data: questionAnswers, isLoading, error } = useFetch(getQuestionAnswersApiUrl);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelection = (answerId) => {
    setSelectedAnswer(answerId);
    onSelectAnswer(answerId);
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {questionAnswers && (
        <Form>
          <FormGroup>
            <Form.Label>Please select an answer:</Form.Label>
            {questionAnswers?.map((answer) => (
              <Form.Check
                key={answer.id}
                type="radio"
                id={answer.id}
                label={answer.text}
                checked={selectedAnswer === answer.id}
                onChange={() => handleAnswerSelection(answer.id)}
              />
            ))}
          </FormGroup>
        </Form>
      )}
    </div>
  );
};

export default FetchQuestionAnswers;
