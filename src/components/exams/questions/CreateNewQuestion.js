import React, { useState } from "react";
import useCreate from '../../hooks/useCreate';
import Form from "../../forms/Form";
import CreateNewAnswer from '../answers/CreateNewAnswer';
import { Spinner, Alert } from "react-bootstrap";

const CreateNewQuestion = (examId) => {
    const createQuestionApiUrl = "https://localhost:7256/api/Question/create";
    const { createEntity, isLoading, error  } = useCreate(createQuestionApiUrl);
    const [ questionIsImage, setQuestionIsImage] = useState(false);
    const [ answersOrderRandom, setAnswersOrderRandom] = useState(false); 
    const [questionId, setQuestionId] = useState();
  
    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number" },
        { name: "questionDescription", label: "Question Description", type: "text" },
        { name: "questionIsImage", label: "Set Question to Image", type: "checkbox", checked: questionIsImage, onChange: () => setQuestionIsImage(!questionIsImage) }, 
        { name: "answersOrder", label: "Set Answers Order to Random", type: "checkbox", checked: answersOrderRandom, onChange: () => setAnswersOrderRandom(!answersOrderRandom) }, 
        { name: "questionScoring", label: "Question Scoring", type: "number" },
      ];
      
    const onSubmit = async (formData) => {
      formData.examId = examId;
      formData.answersOrderRandom = answersOrderRandom
      const response = await createEntity(formData);
      setQuestionId(response.id);
    };

    const handleFormRender = () => {
      return(
          <CreateNewAnswer questionId={questionId} />
      );
  };

    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        <h4>Add question To Exam</h4>
        <Form fields={fields} onSubmit={onSubmit} entityName={"Question"} onRender={handleFormRender} />
      </div>
    );
  };
  
  export default CreateNewQuestion;
  
  
