import React, { useState } from "react";
import { Spinner, Alert, Card, Button } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import Form from "../forms/Form";
import CreateNewQuestion from "./questions/CreateNewQuestion";
import { useUser } from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewExam = () => {
  const { userCourse, user } = useUser();
  const createExamApiUrl = "https://localhost:7252/api/Exam/create";
  const { createEntity, isLoading, error } = useCreate(createExamApiUrl);
  const [showForm, setShowForm] = useState(true); // State to control form visibility
  const [questionsOrderRandom, setQuestionsOrderRandom] = useState(true);
  const [examId, setExamId] = useState();
  const [showCreateQuestion, setShowCreateQuestion] = useState(false); // State to control CreateNewQuestion visibility
  const [examSubmitted, setExamSubmitted] = useState(false); // State to track whether exam is submitted or not
  const navigate = useNavigate();

  const fields = [
    { name: "examName", label: "Exam Name", type: "text" },
    { name: "examDescription", label: "Exam Description", type: "text" },
    { name: "startExamDateTime", label: "Exam Date and Time", type: "datetime-local" },
    {
      name: "examDurationInMinutes",
      label: "Exam Duration In Minutes",
      type: "number",
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
    formData.teacherId = user.id;
    if (userCourse){
      formData.courseId = userCourse.id;
    }
    formData.questionsOrderRandom = questionsOrderRandom;
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
      setShowCreateQuestion(true); // Show the CreateNewQuestion component
    }
  };

  const handleClose = () => {
    setShowForm((prevShowForm) => !prevShowForm); // Toggle the showForm state
  };

  const handleGoBack = () => {
    navigate("/teacher-dashboard");
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
            />
            {!showCreateQuestion && !examSubmitted && (
              <p>Please submit exam to proceed with adding questions to exam</p>
            )}
            {showCreateQuestion && (
              <CreateNewQuestion examId={examId} />
            )}
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
