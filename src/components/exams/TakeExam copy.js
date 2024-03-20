import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Card } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import GetExamQuestions from "./questions/GetExamQuetions";
import SubmitExam from "./SubmitExam";
import Timer from "./Timer";
import { useUser } from "../auth/UserContext";

const TakeExam = () => {
  const { studentExamId } = useUser();
  const takeExamApiUrl = `https://localhost:7252/api/Exam/get-by-id/${studentExamId}`;
  const { data: exam, isLoading, error } = useFetch(takeExamApiUrl);
  console.log(exam);
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
        <Card>
          <Card.Body>
            <Card.Title>Exam: {exam.examName}</Card.Title>
            <Card.Text>
              Description: {exam.examDescription} <br />
              Start Date: {new Date(exam.startExamDateTime).toLocaleString()} <br />
              {exam.endExamDateTime && (
                <>End Date: {new Date(exam.endExamDateTime).toLocaleString()} <br /></>
              )}
              Duration: {exam.examDurationInMinutes} minutes <br />
              <Timer duration={exam.examDurationInMinutes} />
              <br />
              {!showQuestions && !submitting && (
                <Button onClick={handleStartExam}>Start Exam</Button>
              )}
              <br />
              <br />
              {showQuestions && !submitting && (
                <GetExamQuestions
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
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default TakeExam;
