import React, { useState } from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert, Button } from "react-bootstrap";
import GetExamQuetions from "./questions/GetExamQuetions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateExam = ( examId ) => {
  const updateExamApiUrl = "https://localhost:7252/api/Exam/update";
  const { updateEntity, isLoading, error } = useUpdate(updateExamApiUrl);
  const [questionsOrderRandom, setQuestionsOrderRandom] = useState(false);

  const fields = [
    { name: "examName", label: "Exam Name", type: "text" },
    { name: "examDescription", label: "Exam Description", type: "text" },
    { name: "examDateTime", label: "Exam Date and Time", type: "datetime-local" },
    { name: "examDurationInMinutes", label: "Exam Duration In Minutes", type: "number" },
    { name: "questionsOrder", label: "Set Question Order to Random", type: "checkbox", checked: questionsOrderRandom, onChange: () => setQuestionsOrderRandom(!questionsOrderRandom) },
  ];

  const onSubmit = async (formData) => {
    formData.id = examId;
    formData.questionsOrderRandom = questionsOrderRandom;
    try{
      const response = await updateEntity(formData);
      if (response ) {
        toast.success('Update successful!');
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };


  const handleFormRender = () => {
    return(
        <GetExamQuetions examId={examId}/>
    );
};

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Form fields={fields} onSubmit={onSubmit} entityName={"Exam"} onRender={handleFormRender} />
      <Button onClick={handleFormRender}>See Exam Questions</Button>
    </div>
  );
};

export default UpdateExam;
