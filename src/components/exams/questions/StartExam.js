import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";

const StartExam = ({ questionId, questionNumber, questionDescription, questionScoring, onEndExam }) => {
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(() => {
    const storedAnswer = localStorage.getItem(`selectedAnswer_${questionId}`);
    return storedAnswer ? JSON.parse(storedAnswer) : null;
  });
  const [examEnded, setExamEnded] = useState(false);
  const [failedQuestions, setFailedQuestions] = useState(() => {
    const storedFailedQuestions = JSON.parse(localStorage.getItem('failedQuestions'));
    return storedFailedQuestions ? storedFailedQuestions : [];
  });

  const getAnswersApiUrl = `https://localhost:7252/api/Question/${questionId}/answers`;
  const { data: answersData, isLoading: isLoadingAnswers, error: answersError } = useFetch(getAnswersApiUrl);

  useEffect(() => {
    if (answersData) {
      setAnswers(answersData);
    }
  }, [answersData]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
    localStorage.setItem(`selectedAnswer_${questionId}`, JSON.stringify(answer));
    
    if (answer.isCorrect === false) {
      const correctAnswer = answers.find((ans) => ans.isCorrect);
      if (correctAnswer) {
        const failedQuestionInfo = {
          questionNumber: questionNumber,
          questionDescription: questionDescription,
          questionScoring: questionScoring,
          correctAnswerNumber: correctAnswer.answerNumber,
          correctAnswerDescription: correctAnswer.answerDescription,
          chosenWrongAnswerNumber: answer.answerNumber,
          chosenWrongAnswerDescription: answer.answerDescription
        };
        
        localStorage.setItem('failedQuestions', JSON.stringify([...failedQuestions, failedQuestionInfo]));
        setFailedQuestions(prevFailedQuestions => [...prevFailedQuestions, failedQuestionInfo]);
      }
    }
  };
  
  const handleEndExam = async () => {
    if (!selectedAnswer) {
      alert("Please select an answer for each question before submitting the exam.");
      return;
    }
    console.log(failedQuestions);
    onEndExam(failedQuestions);
    setExamEnded(true);
    
    // Dynamically fetch keys from local storage and remove selected answers
    Object.keys(localStorage)
      .filter(key => key.startsWith('selectedAnswer_'))
      .forEach(key => localStorage.removeItem(key));
    
    localStorage.removeItem('failedQuestions'); // Remove stored failed questions after exam ends
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
                value={answer}
                checked={selectedAnswer && selectedAnswer.id === answer.id}
                onChange={() => handleAnswerSelection(answer)}
              />
              {answer.number} {answer.answerDescription}
            </label>
          </div>
        ))}
      </div>
      <br />
      {!examEnded && <Button onClick={handleEndExam}>End Exam and Get Grade</Button>}
    </div>
  );
};

export default StartExam;
