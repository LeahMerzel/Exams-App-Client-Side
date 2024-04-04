import React, { useState } from "react";
import { Spinner, Alert, Card, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import Form from "../forms/Form";
import CreateNewQuestion from "./questions/CreateNewQuestion";
import { useUser } from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {fetchEntityAPI} from '../api/CrudApi';

const CreateNewExam = () => {
  const { userCourse, user } = useUser();
  const createExamApiUrl = "https://localhost:7252/api/Exam/create";
  const { createEntity, isLoading, error } = useCreate(createExamApiUrl);
  const [showForm, setShowForm] = useState(true); 
  const [questionsOrderRandom, setQuestionsOrderRandom] = useState(false);
  const [examId, setExamId] = useState(null);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false); 
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const fields = [
    { name: "teacherName", label: "Teacher Name", type: "text", required: true },
    { name: "examName", label: "Exam Name", type: "text", required: true },
    { name: "examDescription", label: "Exam Description", type: "text" },
    { name: "startExamDateTime", label: "Exam Date and Time", type: "datetime-local", required: true },
    {
      name: "examDurationInMinutes",
      label: "Exam Duration In Minutes",
      type: "number",
      required: true
    },
    {
      name: "IsOrderQuestionsRandom",
      label: "Set Question Order to Random",
      type: "checkbox",
      checked: questionsOrderRandom,
      onChange: () => setQuestionsOrderRandom(!questionsOrderRandom),
    },
  ];

  const onSubmit = async (formData) => {
    const requiredFields = fields.filter(field => field.required);
    const missingFields = requiredFields.filter(field => !formData[field.name]);
    if (missingFields.length > 0) {
      const errors = {};
      missingFields.forEach(field => {
        errors[field.name] = `${field.label} is required`;
      });
      setValidationErrors(errors);
      return;
    }

    formData.teacherId = user.id;
    if (userCourse){
      formData.courseId = userCourse.id;
    }
    formData.isOrderQuestionsRandom = questionsOrderRandom;
    const response = await createEntity(formData);
    setExamId(response.id);
    setExamSubmitted(true); 
    if (response){
      toast.success("exam created")
    }
    else {
      toast.error("exam was not created")
    }
  };

  const handleCreateQuestion = () => {
    if (examSubmitted) {
      setShowCreateQuestion(true); 
    }
  };

  const handleClose = () => {
    setShowForm((prevShowForm) => !prevShowForm); 
  };

  const handleGoBack = () => {
    navigate("/teacher-dashboard");
  };

  const handleSaveExamLocally = async () => {
    const getExamApiUrl = `https://localhost:7252/api/Exam/${examId}/exam-questions-answers`;
    try {
      const exam = await fetchEntityAPI(getExamApiUrl);
      if (!exam || !examId) return;
  
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
  };
  
  return (
    <Card>
      <Card.Body>
        <Card.Title>Create New Exam</Card.Title>
        {showForm && (
          <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form
              fields={fields}
              onSubmit={onSubmit}
              entityName={"Exam"}
              onRender={handleCreateQuestion}
              validationErrors={validationErrors}
            />
            {!showCreateQuestion && !examSubmitted && (
              <p>Please submit exam to proceed with adding questions to exam</p>
            )}
            {examId && showCreateQuestion && (
              <CreateNewQuestion examId={examId} />
            )}
            <Button className="mt-3 mb-3" variant="primary" onClick={handleSaveExamLocally}>
              Save Exam Locally
            </Button>
          </div>
        )}
        <>
          <Button onClick={handleClose} className="mr-2" variant="secondary">
            {showForm ? "Close" : "Open"}
          </Button>
          <Button variant="link" onClick={handleGoBack} className="mr-2">Go Back</Button>
        </>
      </Card.Body>
    </Card>
  );
};

export default CreateNewExam;
