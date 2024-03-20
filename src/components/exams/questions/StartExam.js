import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const StartExam = ({ questionId, questionNumber, questionDescription, questionScoring, onEndExam }) => {
  const [answers, setAnswers] = useState([]);
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    // Load selected answer from local storage when component mounts
    const storedAnswer = localStorage.getItem(`selectedAnswer_${questionId}`);
    return storedAnswer ? JSON.parse(storedAnswer) : null;
  });
  const [examEnded, setExamEnded] = useState(false); // State to track if exam has ended

  const getAnswersApiUrl = `https://localhost:7252/api/Question/${questionId}/answers`;
  const { data: answersData, isLoading: isLoadingAnswers, error: answersError } = useFetch(getAnswersApiUrl);

  useEffect(() => {
    if (answersData) {
      setAnswers(answersData);
    }
  }, [answersData]);

  useEffect(() => {
    // Save selected answer to local storage when it changes
    localStorage.setItem(`selectedAnswer_${questionId}`, JSON.stringify(selectedAnswer));
  }, [selectedAnswer, questionId]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer); // Update selected answer state
    if (!answer.isCorrect) {
      const correctAnswer = answers.find((ans) => ans.isCorrect);
      const questionInfo = {
        questionNumber: questionNumber,
        questionDescription: questionDescription,
        questionScoring: questionScoring,
        correctAnswerNumber: correctAnswer.number,
        correctAnswerDescription: correctAnswer.answerDescription
      };
      setFailedQuestions((prevFailedQuestions) => [...prevFailedQuestions, questionInfo]);
    }
  };

  const handleEndExam = () => {
    if (!selectedAnswer) {
      alert("Please select an answer before submitting the exam.");
      return;
    }
    onEndExam(failedQuestions);
    setExamEnded(true); // Set examEnded to true when exam ends
  };

  if (isLoadingAnswers) {
    return <Spinner animation="border" />;
  }

  if (answersError) {
    return <Alert variant="danger">Error: {answersError}</Alert>;
  }

  if (!answers || answers.length === 0) {
    return <Alert variant="info">Answers were not fetched yet. Please try again until they are fetched.</Alert>;
  }

  return (
    <div>
      <br />
      <div>
        {answers.map((answer) => (
          <div key={answer.id}>
            <label>
              <input
                type="radio"
                name="answer"
                value={answer.id}
                checked={selectedAnswer && selectedAnswer.id === answer.id}
                onChange={() => handleAnswerSelection(answer)}
              />
              {answer.number} {answer.answerDescription}
            </label>
          </div>
        ))}
      </div>
      <br/>
      {!examEnded && <Button onClick={handleEndExam}>End Exam and Get Grade</Button>}
    </div>
  );
};

export default StartExam;
