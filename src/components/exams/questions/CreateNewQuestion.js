import React, { useState } from "react";
import useCreate from '../../hooks/useCreate';
import Form from "../../forms/Form";
import CreateNewAnswer from '../answers/CreateNewAnswer';
import { Spinner, Alert, Button } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNewQuestion = ({ examId, onAddSuccess }) => {
    const createQuestionApiUrl = "https://localhost:7252/api/Question/create";
    const { createEntity, isLoading, error  } = useCreate(createQuestionApiUrl);
    const [ answersOrderRandom, setAnswersOrderRandom] = useState(false); 
    const [ questionId, setQuestionId] = useState();
    const [ showCreateAnswer, setShowCreateAnswer] = useState(false); 
    const [ validationErrors, setValidationErrors ] = useState({}); 
    const [ imageData, setImageData ] = useState(null); // State to hold image data

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log("Selected file:", file);
        setImageData(file);
    };
    
    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number", required: true },
        { name: "questionDescription", label: "Question Description", type: "text", required: true},
        { name: "isImage", label: "Add Image to Question", type: "file", onChange: handleImageChange }, // Use a file input type for image upload
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
    
        // If image data is present, append it to the formData
        if (imageData) {
            formData.imageFile = imageData;
            console.log(formData.imageFile)
        }
    
        const response = await createEntity(formData);
        if (response) {
            setQuestionId(response.id);
            toast.success("Question created");
            if (onAddSuccess) {
                onAddSuccess();
            }
        } else {
            toast.error("Question was not created");
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
            <Form fields={fields} onSubmit={onSubmit} entityName={"Question"} validationErrors={validationErrors} />
            <Button onClick={handleAddAnswer}>Add Answer</Button>
            {showCreateAnswer && questionId && <CreateNewAnswer questionId={questionId}/>}
        </div>
    );
};

export default CreateNewQuestion;
