import React, { useState } from "react";
import useCreate from '../../hooks/useCreate';
import Form from "../../forms/Form";
import { Spinner, Alert, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewAnswer = ({ questionId, onAddSuccess }) => {
  const createAnswerApiUrl = "https://localhost:7252/api/Answer/create";
  const { createEntity, isLoading, error } = useCreate(createAnswerApiUrl);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showForm, setShowForm] = useState(true);

  const fields = [
    { name: "answerNumber", label: "Answer Number", type: "number", required: true },
    { name: "answerDescription", label: "Answer Description", type: "text", required: true },
    { name: "isCorrect", label: "Is The Answer Correct", type: "checkbox", checked: answerIsCorrect, onChange: () => setAnswerIsCorrect(!answerIsCorrect) },
  ];

  const onSubmit = async (formData) => {
    formData.questionId = questionId;
    if (!formData.questionId) return;

    const isValid = validateFormData(formData);
    if (!isValid) {
      return;
    }

    const response = await createEntity(formData);
    if (response) {
      toast.success("Answer created");
      onAddSuccess();
      setShowForm(false);
    } else {
      toast.error("Answer was not created");
    }
  };

  const validateFormData = (formData) => {
    const errors = {};
    for (const field of fields) {
      const { name, required } = field;
      if (required && !formData[name]) {
        errors[name] = `${field.label} is required`;
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {showForm && (
        <>
          <h4>Add Answer To Question</h4>
          <Form
            fields={fields}
            onSubmit={onSubmit}
            entityName={onAddSuccess ? "this Answer" : "Answer"}
            validationErrors={validationErrors}
          />
          <Button className="mt-2" variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
        </>
      )}
    </div>
  );
};

export default CreateNewAnswer;
