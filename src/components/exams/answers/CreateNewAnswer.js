import React, { useState } from "react";
import useCreate from '../../hooks/useCreate';
import Form from "../../forms/Form";
import { Spinner, Alert } from "react-bootstrap";

const CreateNewAnswer = (questionId) => {
    const createAnswerApiUrl = "https://localhost:7252/api/Answer/create";
    const { createEntity, isLoading, error  } = useCreate(createAnswerApiUrl);
    const [ answerIsCorrect, setAnswerIsCorrect] = useState(false);
  
    const fields = [
        { name: "answerNumber", label: "Answer Number", type: "number" },
        { name: "answerDescription", label: "Answer Description", type: "text" },
        { name: "isCorrect", label: "Is The Answer Correct", type: "checkbox", checked: answerIsCorrect, onChange: () => setAnswerIsCorrect(!answerIsCorrect) }, 
      ];
      
    const onSubmit = async (formData) => {
      formData.questionId = questionId;
        await createEntity(formData);
    };

    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        <h4>Add Answer To Question</h4>
        <Form fields={fields} onSubmit={onSubmit} entityName={"Answer"} />
      </div>
    );
  };
  
  export default CreateNewAnswer;
  
  
