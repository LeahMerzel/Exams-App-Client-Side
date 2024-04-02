import React, { useState } from "react";
import useCreate from '../../hooks/useCreate';
import Form from "../../forms/Form";
import CreateNewAnswer from '../answers/CreateNewAnswer';
import { Spinner, Alert, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewQuestion = ({ examId }) => {
    const createQuestionApiUrl = "https://localhost:7252/api/Question/create";
    const { createEntity, isLoading, error  } = useCreate(createQuestionApiUrl);
    const [ answersOrderRandom, setAnswersOrderRandom] = useState(false); 
    const [ questionId, setQuestionId] = useState();
    const [ showCreateAnswer, setShowCreateAnswer] = useState(false); 
    const [ validationErrors, setValidationErrors ] = useState({}); 

    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number", required: true },
        { name: "questionDescription", label: "Question Description", type: "text", required: true},
        { name: "answersOrder", label: "Set Answers Order to Random", type: "checkbox", checked: answersOrderRandom, onChange: () => setAnswersOrderRandom(!answersOrderRandom) }, 
        { name: "questionScoring", label: "Question Scoring", type: "number", required: true },
    ];

    const onSubmit = async (formData) => {
        formData.examId = examId;
        formData.answersOrderRandom = answersOrderRandom;

        const isValid = validateFormData(formData);
        if (!isValid) {
            return;
        }

        const response = await createEntity(formData);
        setQuestionId(response.id);
        if (response){
            toast.success("question created")
        } else {
            toast.error("question was not created")
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

    const handleAddAnswer = () => {
        setShowCreateAnswer(true); 
    };

    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            <h4>Add question To Exam</h4>
            <Form fields={fields} onSubmit={onSubmit} entityName={"Question"} validationErrors={validationErrors} /> {/* Pass validationErrors to the Form */}
            <Button onClick={handleAddAnswer}>Add Answer</Button>
            {showCreateAnswer && questionId && <CreateNewAnswer questionId={questionId} />}
        </div>
    );
};

export default CreateNewQuestion;
