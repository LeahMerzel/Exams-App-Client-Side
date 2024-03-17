import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import GetExamQuestions from "./questions/GetExamQuetions";
import SubmitExam from "./SubmitExam";
import Timer from "./Timer";
import { useUser } from "../auth/UserContext";

const TakeExam = () => {
  const {studentExamId} = useUser();
  const takeExamApiUrl = `https://localhost:7252/api/Exam/get-by-id/${studentExamId}`;
  const { data: exam, isLoading, error } = useFetch(takeExamApiUrl);
  const [showQuestions, setShowQuestions] = useState(false);
  const [grade, setGrade] = useState(null);
  const [failedQuestions, setFailedQuestions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [examStarted, setExamStarted] = useState(false); // New state variable

  const handleStartExam = () => {
    setShowQuestions(true);
    setExamStarted(true); // Update the examStarted state when the exam starts
  };

  const handleFinishExam = (grade, failedQuestions) => {
    setGrade(grade);
    setFailedQuestions(failedQuestions);
    setSubmitting(true);
  };

  const handleReturnToExam = () => {
    setShowQuestions(true);
  };

  const handleSubmitExam = () => {
    setShowQuestions(false);
    setSubmitting(true);
  };

  useEffect(() => {
    if (examStarted && exam) {
      const timer = setTimeout(() => {
        handleSubmitExam();
      }, exam.durationInMinutes * 60 * 1000);

      return () => clearTimeout(timer);
    }
  }, [examStarted, exam]);

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {exam && (
        <>
          <h2>{exam.examName}</h2>
          <p>Description: {exam.examDescription}</p>
          <p>Start Date: {new Date(exam.startExamDateTime).toLocaleString()}</p>
          {exam.endExamDateTime && (
            <p>End Date: {new Date(exam.endExamDateTime).toLocaleString()}</p>
          )}
          <p>Duration: {exam.examDurationInMinutes} minutes</p>
          <Timer duration={exam.examDurationInMinutes} />
          <br/>
          {!showQuestions && !submitting && (
            <Button onClick={handleStartExam}>Start Exam</Button>
          )}
          <br/>
          <br/>
          {showQuestions && !submitting && (
            <GetExamQuestions
              examId={exam.id}
              onFinishExam={handleFinishExam}
              duration={exam.examDurationInMinutes}
            />
          )}
          {!submitting && (
            <Button onClick={handleSubmitExam}>Submit Exam and Receive Grade</Button>
          )}
          {submitting && (
            <>
              <SubmitExam
                exam={exam}
                grade={grade}
                failedQuestions={failedQuestions}
              />
              <Button onClick={handleReturnToExam}>Return to Exam Questions</Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default TakeExam;
