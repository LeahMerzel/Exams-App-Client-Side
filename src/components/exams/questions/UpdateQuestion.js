import React, { useState} from "react";
import useUpdate from "../../hooks/useUpdate";
import Form from "../../forms/Form";
import { Spinner, Alert } from "react-bootstrap";
import GetQuestionAnswers from '../answers/GetQuestionAnswers';

const UpdateQuestion = ({questionId}) => {
    const updateQuestionApiUrl = "https://localhost:7252/api/Question/update";
    const { updateEntity, isLoading, error } = useUpdate(updateQuestionApiUrl);
    const [ answersOrderRandom, setAnswersOrderRandom] = useState(false); 

    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number" },
        { name: "questionDescription", label: "Question Description", type: "text" },
        { name: "answersOrder", label: "Set Answers Order to Random", type: "checkbox", checked: answersOrderRandom, onChange: () => setAnswersOrderRandom(!answersOrderRandom) }, 
        { name: "questionScoring", label: "Question Scoring", type: "number" },
      ];

    const onSubmit = async (formData) => {
        formData.id = questionId;
        formData.answersOrderRandom = answersOrderRandom;
        await updateEntity(formData);
    };

    const handleFormRender = () => {
        return(
            <GetQuestionAnswers questionId={questionId}/>
        );
    };    

    return (
        <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Question"} onRender={handleFormRender}/>
        </div>
    );
};
  
export default UpdateQuestion;
