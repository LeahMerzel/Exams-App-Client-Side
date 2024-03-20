import React, { useState, useEffect } from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert, Button } from "react-bootstrap";
import GetExamQuetions from "./questions/GetExamQuetions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../hooks/useFetch";

const UpdateExam = ({ examId }) => {
  const entireExamApiUrl = `https://localhost:7252/api/Exam/${examId}/questions-answers`;
  const { data: entireExam, isLoading: isLoadingExam, error: examError } = useFetch(entireExamApiUrl);
  console.log(entireExam)
  const updateExamApiUrl = "https://localhost:7252/api/Exam/update";
  const { updateEntity, isLoading, error } = useUpdate(updateExamApiUrl);
  const [examFormData, setExamFormData] = useState({
    examDescription: "",
    examDurationInMinutes: "",
    examGradeAvg: null,
    examName: "",
    examQuestions: [],
    isOrderQuestionsRandom: false,
    startExamDateTime: "",
    studentsExams: [],
    wasExamLoggedInToByStudent: null
  });
  const [questionsOrderRandom, setQuestionsOrderRandom] = useState(false);

  useEffect(() => {
    if (entireExam) {
      setExamFormData({
        examDescription: entireExam.examDescription,
        examDurationInMinutes: entireExam.examDurationInMinutes,
        examGradeAvg: entireExam.examGradeAvg,
        examName: entireExam.examName,
        examQuestions: entireExam.examQuestions,
        isOrderQuestionsRandom: entireExam.isOrderQuestionsRandom,
        startExamDateTime: entireExam.startExamDateTime,
        studentsExams: entireExam.studentsExams,
        wasExamLoggedInToByStudent: entireExam.wasExamLoggedInToByStudent
      });
      setQuestionsOrderRandom(entireExam.isOrderQuestionsRandom);
    }
  }, [entireExam]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setExamFormData({
      ...examFormData,
      [name]: newValue,
    });
  };

  const onSubmit = async (formData) => {
    try {
      formData.id = examId;
      formData.isOrderQuestionsRandom = questionsOrderRandom;
      const response = await updateEntity(formData);
      if (response) {
        toast.success('Update successful!');
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      <Form
        fields={[
          { name: "examName", label: "Exam Name", type: "text", value: examFormData.examName, onChange: handleChange },
          { name: "examDescription", label: "Exam Description", type: "text", value: examFormData.examDescription, onChange: handleChange },
          { name: "examDateTime", label: "Exam Date and Time", type: "datetime-local", value: examFormData.startExamDateTime, onChange: handleChange },
          { name: "examDurationInMinutes", label: "Exam Duration In Minutes", type: "number", value: examFormData.examDurationInMinutes, onChange: handleChange },
          { name: "startExamDateTime", label: "Start Exam Date and Time", type: "datetime-local", value: examFormData.startExamDateTime, onChange: handleChange },
          { name: "isOrderQuestionsRandom", label: "Randomize Question Order", type: "checkbox", checked: questionsOrderRandom, onChange: () => setQuestionsOrderRandom(!questionsOrderRandom) },
          { name: "isOrderAnswersRandom", label: "Randomize Answers Order", type: "checkbox", checked: examFormData.isOrderAnswersRandom, onChange: handleChange },
          // Add more fields as needed
        ]}
        onSubmit={onSubmit}
        entityName={"Exam"}
      >
         <div>
    {/* Render questions and answers inside the Form component */}
    {isLoadingExam && <Spinner animation="border" />}
    {examError && <Alert variant="danger">Error: {examError}</Alert>}
    {examFormData.examQuestions.map((question, index) => (
      <div key={index}>
        <h3>Question {index + 1}</h3>
        <p>Question: {question.questionDescription}</p>
        <ul>
          {question.answers.map((answer, answerIndex) => (
            <li key={answerIndex}>{answer.answerDescription}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
</Form>
    </div>
  );
};

export default UpdateExam;
