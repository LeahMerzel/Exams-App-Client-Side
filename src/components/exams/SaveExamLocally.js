import React from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { toast } from 'react-toastify';

const SaveExamLocally = ({ examId }) => {
  const getExamApiUrl = `https://localhost:7252/api/Exam/${examId}`;
  const { data: exam, isLoading, error } = useFetch(getExamApiUrl);

  const saveLocally = () => {
    if (!exam) {return};
    console.log(exam)
    if (exam) {
      try {
        const jsonExam = JSON.stringify(exam);
        const blob = new Blob([jsonExam], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${exam.examName}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Exam saved locally!');
      } catch (error) {
        console.error('Error saving exam locally:', error.message);
        toast.error('Error saving exam locally. Please try again.');
      }
    }
  };

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Error: {error}</Alert>;

  return (
    <Button variant="primary" onClick={saveLocally}>
      Save Exam Locally
    </Button>
  );
};

export default SaveExamLocally;
