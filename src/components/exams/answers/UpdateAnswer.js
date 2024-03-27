import React, { useState} from "react";
import useUpdate from "../../hooks/useUpdate";
import Form from '../../forms/Form';
import { Spinner, Alert } from "react-bootstrap";

const UpdateAnswer = (answerId) => {
    const updateAnswerApiUrl = "https://localhost:7252/api/Answer/update";
    const { updateEntity, isLoading, error } = useUpdate(updateAnswerApiUrl);
    const [ answerIsCorrect, setAnswerIsCorrect] = useState(false);

    const fields = [
        { name: "answerNumber", label: "Answer Number", type: "number" },
        { name: "answerDescription", label: "Answer Description", type: "text" },
        { name: "isCorrect", label: "Is The Answer Correct", type: "checkbox", checked: answerIsCorrect, onChange: () => setAnswerIsCorrect(!answerIsCorrect) }
      ];

    const onSubmit = async (formData) => {
        formData.id = answerId;
        formData.answerIsCorrect = answerIsCorrect;
        await updateEntity(formData);
    };


    return (
        <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Answer"}/>
        </div>
    );
};
  
export default UpdateAnswer;
