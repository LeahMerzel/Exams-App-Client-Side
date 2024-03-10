import React, { useEffect } from "react";
import useCreate from "../hooks/useCreate";
import { useUser } from "../auth/UserContext";
import { Spinner, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubmitExam = ({ exam, grade, failedQuestions }) => {
  const { user } = useUser();
  const apiUrl = "https://localhost:7252/api/StudentExam/create";
  const { createEntity, isLoading, error } = useCreate(apiUrl);

  useEffect(() => {
    const handleSubmitExam = async () => {
      try {
        await createEntity({
          examId: exam.examId,
          grade,
          failedQuestions,
          userId: user.userId,
          fullName: user.FullName
        });
      } catch (error) {
        toast.error("Failed to submit exam. Please try again.");
      }
    };

    handleSubmitExam();
  }, []); // Run once on component mount

  if (isLoading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div>
      <h2>Congratulations!</h2>
      <p>Exam: {exam.examName}</p>
      <p>Grade: {grade}</p>
      <p>Failed Questions:</p>
      <ul>
        {failedQuestions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
      <p>Submitted by: {user.FullName}</p>
    </div>
  );
};

export default SubmitExam;
