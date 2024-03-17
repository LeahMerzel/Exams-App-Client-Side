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
    const [ showCreateAnswer, setShowCreateAnswer] = useState(false); // State to control CreateNewAnswer visibility

    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number" },
        { name: "questionDescription", label: "Question Description", type: "text" },
        { name: "answersOrder", label: "Set Answers Order to Random", type: "checkbox", checked: answersOrderRandom, onChange: () => setAnswersOrderRandom(!answersOrderRandom) }, 
        { name: "questionScoring", label: "Question Scoring", type: "number" },
    ];

    const onSubmit = async (formData) => {
        formData.examId = examId;
        formData.answersOrderRandom = answersOrderRandom;
        const response = await createEntity(formData);
        setQuestionId(response.id);
        if (response){
            toast.success("question created")
          }
          else {
            toast.error("question was not created")
          }      
    };

    const handleAddAnswer = () => {
        setShowCreateAnswer(true); // Show the CreateNewAnswer component when the button is clicked
    };

    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            <h4>Add question To Exam</h4>
            <Form fields={fields} onSubmit={onSubmit} entityName={"Question"} />
            <Button onClick={handleAddAnswer}>Add Answer</Button>
            {showCreateAnswer && questionId && <CreateNewAnswer questionId={questionId} />}
        </div>
    );
};

export default CreateNewQuestion;
