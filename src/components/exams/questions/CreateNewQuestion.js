import React, { useState } from "react";
import useCreate from '../../hooks/useCreate';
import Form from "../../forms/Form";
import CreateNewAnswer from '../answers/CreateNewAnswer';
import UploadImageForm from '../../image handling/UploadImageForm'; 
import { Spinner, Alert, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewQuestion = ({ examId, onAddSuccess }) => {
    const createQuestionApiUrl = "https://localhost:7252/api/Question/create";
    const { createEntity, isLoading, error  } = useCreate(createQuestionApiUrl);
    const [ answersOrderRandom, setAnswersOrderRandom] = useState(false); 
    const [ isImage, setIsImage ] = useState(false); 
    const [ questionId, setQuestionId] = useState();
    const [ showCreateAnswerKey, setShowCreateAnswerKey] = useState(Date.now()); // Key for toggling CreateNewAnswer component 
    const [ validationErrors, setValidationErrors ] = useState({}); 
    const [showCreateAnswer, setShowCreateAnswer] = useState(false);

    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number", required: true },
        { name: "questionDescription", label: "Question Description", type: "text", required: true},
        { name: "answersOrder", label: "Set Answers Order to Random", type: "checkbox", checked: answersOrderRandom, onChange: () => setAnswersOrderRandom(!answersOrderRandom) }, 
        { name: "questionScoring", label: "Question Scoring", type: "number", required: true },
    ];

    const handleAddImage = () => {
        setIsImage(true);
    };
  
    const onSubmit = async (formData) => {
        formData.examId = examId;
        formData.answersOrderRandom = answersOrderRandom;

        const isValid = validateFormData(formData);
        if (!isValid) {
            return;
        }

        const response = await createEntity(formData);
        if (response){
            setQuestionId(response.id);
            toast.success("question created");
                    // if (onAddSuccess) {
        //     onAddSuccess();
        // }

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
        setShowCreateAnswerKey(Date.now()); // Toggle CreateNewAnswer component by changing its key
    };

    const handleAddAnswerSucceeded = () => {
        setShowCreateAnswer(false);
    };

    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            <h4>Add question To Exam</h4>
            <Form fields={fields} onSubmit={onSubmit} entityName={"Question"} validationErrors={validationErrors} />
            <Button onClick={handleAddImage}>Add Image</Button>
            {isImage && questionId && <UploadImageForm questionId={questionId} />} 
            <Button onClick={handleAddAnswer}>Add Answer</Button>
            {questionId && showCreateAnswer && <CreateNewAnswer 
                key={showCreateAnswerKey} 
                questionId={questionId} 
                onAddSuccess={handleAddAnswerSucceeded} 
            />}
        </div>
    );
};

export default CreateNewQuestion;
