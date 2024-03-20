import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../hooks/useFetch";
import useUpdate from "../hooks/useUpdate";

const UpdateExam = ({ examId, onUpdateSuccess }) => {
  const entireExamApiUrl = `https://localhost:7252/api/Exam/${examId}/questions-answers`;
  const { data: entireExam, isLoading: isLoadingExam, error: examError } = useFetch(entireExamApiUrl);
  const updateExamApiUrl = "https://localhost:7252/api/Exam/update";
  const { updateEntity, isLoading: isLoadingUpdate, error: updateError } = useUpdate(updateExamApiUrl);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (entireExam) {
      setFormData(entireExam);
    }
  }, [entireExam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEntity(formData);
      if (response) {
        toast.success('Update successful!');
        onUpdateSuccess();
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };

  if (isLoadingExam || isLoadingUpdate) return <Spinner animation="border" />;
  if (examError || updateError) return <Alert variant="danger">Error: {examError || updateError}</Alert>;
  
  // Conditional rendering block to check if entireExam exists
  if (!entireExam) return null;

  const excludedProperties = ['id', 'createdAt', 'examGradeAvg', 'teacherId', 'studentsExams', 'wasExamLoggedInToByStudent'];

  return (
    <div>
      <Form onSubmit={onSubmit}>
        {Object.entries(formData)
          .filter(([key]) => !excludedProperties.includes(key))
          .map(([key, value]) => {
            if (key === 'examQuestions') {
              return value.map((question, questionIndex) => (
                <div key={questionIndex}>
                  <Form.Group>
                    <Form.Label>{`Question ${questionIndex + 1}`}</Form.Label>
                    <Form.Control
                      type="text"
                      name={`examQuestions[${questionIndex}].questionDescription`}
                      value={question.questionDescription}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  {question.answers.map((answer, answerIndex) => (
                    <Form.Group key={answerIndex}>
                      <Form.Label>{`Answer ${answerIndex + 1}`}</Form.Label>
                      <Form.Control
                        type="text"
                        name={`examQuestions[${questionIndex}].answers[${answerIndex}].answerDescription`}
                        value={answer.answerDescription}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  ))}
                </div>
              ));
            } else {
              return (
                <Form.Group key={key}>
                  <Form.Label>{key}</Form.Label>
                  <Form.Control
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              );
            }
          })}
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default UpdateExam;
