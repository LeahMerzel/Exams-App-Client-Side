import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Card } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import StartExam from '../exams/questions/StartExam';
import Timer from './Timer';
import { useUser } from "../auth/UserContext";
import useCreate from '../hooks/useCreate';
import { useNavigate } from "react-router-dom";

const TakeExam = () => {
  const navigate = useNavigate();
  const { studentExam, user } = useUser();
  const takeExamApiUrl = `https://localhost:7252/api/Exam/get-by-id/${studentExam.id}`;
  const { data: exam, isLoading: isLoadingExam, error: examError } = useFetch(takeExamApiUrl);
  const getQuestionsApiUrl = `https://localhost:7252/api/Exam/${studentExam.id}/questions`;
  const { data: questions, isLoading: isLoadingQuestions, error: questionsError } = useFetch(getQuestionsApiUrl);
  const createStudentExamApiUrl = `https://localhost:7252/api/StudentExam/create`;
  const { createEntity, isLoading: isLoadingCreate, error: createError } = useCreate(createStudentExamApiUrl);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startExam, setStartExam] = useState(false);
  const [examStarted, setExamStarted] = useState(false); 
  const [grade, setGrade] = useState(0);
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [calculatingGrade, setCalculatingGrade] = useState(false);
  const [displayGrade, setDisplayGrade] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false); // State to track if exam is submitted

  const handleStartExam = () => {
    setStartExam(true);
    setExamStarted(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.min(prevIndex + 1, questions.length - 1));
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(prevIndex => Math.max(prevIndex - 1, 0));
  };

  const handleSubmitExam = async () => {
    const studentExamData = {
      studentName: user.fullName,
      studentId: user.id,
      examId: studentExam.id,
      grade: grade,
      failedQuestions: failedQuestions,
      wasExamLoggedInToByStudent: true
    };
    const response = await createEntity(studentExamData);
    if (response){
      alert("You've Successfully Submitted Your Exam.");
      navigate("/student-dashboard");
      setExamSubmitted(true); 
    }
  };

  const updateGradeAndFailedQuestions = (failedQuestionsList) => {
    setStartExam(false);
    setFailedQuestions(failedQuestionsList);
    setCalculatingGrade(true);
    // Simulate calculation delay with setTimeout
    setTimeout(() => {
      let calculatedGrade = 100;
      failedQuestionsList.forEach((question) => {
        calculatedGrade -= question.questionScoring;
      });
      setGrade(calculatedGrade);
      setCalculatingGrade(false);
      setDisplayGrade(true);
    }, 2000);
  };

  return (
    <div>
      {(isLoadingExam || isLoadingQuestions) && <Spinner animation="border" />}
      {(examError || questionsError) && <Alert variant="danger">Error: {examError || questionsError}</Alert>}
      {exam && (
        <Card>
          <Card.Body>
            <Card.Title>Exam: {exam.examName}</Card.Title>
            <br />
            <Card.Text>
              Description: {exam.examDescription} <br /><br />
              Start Date: {new Date(exam.startExamDateTime).toLocaleString()} <br /><br />
              Duration: {exam.examDurationInMinutes} minutes <br /><br />
              {!startExam && !examStarted && (
                <Button onClick={handleStartExam}>Start Exam</Button>
              )}
              {startExam && questions && questions.length > 0 && (
                <>
                  {!examSubmitted && <Timer duration={studentExam.examDurationInMinutes} />} {/* Render the Timer only if exam is not submitted */}
                  <br /><br />
                  <div key={currentQuestionIndex}>
                    <h3>{questions[currentQuestionIndex].questionNumber}</h3>
                    <p>{questions[currentQuestionIndex].questionDescription}</p>
                    <StartExam
                      questionId={questions[currentQuestionIndex].id}
                      questionNumber={questions[currentQuestionIndex].questionNumber}
                      questionDescription={questions[currentQuestionIndex].questionDescription}
                      questionScoring={questions[currentQuestionIndex].questionScoring}
                      onEndExam={updateGradeAndFailedQuestions} 
                    />
                  </div >
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>Previous</Button>{' '}
                    <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</Button>
                  </div>
                </>
              )}
              <br/>
              {calculatingGrade && (
                <>
                  <Spinner animation="border"/>
                  <p>Calculating Grade for you...</p>
                </>
              )}
              {displayGrade && (
                <>
                  <Alert className="mt-2" variant="primary" style={{ display: "inline-block" }}>Your Grade: {grade}%</Alert>
                  <br/>
                  <Button className="mt-2" onClick={handleSubmitExam}>Submit Exam to Teacher</Button>
                </>
              )}
              <br/>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default TakeExam;
