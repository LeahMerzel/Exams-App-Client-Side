import React, {useState} from "react";
import { Spinner, Alert } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import Form from "../forms/Form";
import CreateNewQuestion from "./questions/CreateNewQuestion";

const CreateNewExam = ({token, id}) => {
    const createExamApiUrl = "https://localhost:7252/api/Exam/create";
    const { createEntity, isLoading, error } = useCreate(token, createExamApiUrl);
    const [questionsOrderRandom, setQuestionsOrderRandom] = useState(false); 

    const fields = [
        { name: "examTeacherId", label: "Exam Teacher Id", type: id? id: "text" },
        { name: "examName", label: "Exam Name", type: "text" },
        { name: "examDescription", label: "Exam Description", type: "text" },
        { name: "course", label: "Course", type: "select", options: [] },
        { name: "examDateTime", label: "Exam Date and Time", type: "datetime-local" },
        { name: "examDurationInMinutes", label: "Exam Duration In Minutes", type: "number" },
        { name: "questionsOrder", label: "Set Question Order to Random", type: "checkbox", checked: questionsOrderRandom, onChange: () => setQuestionsOrderRandom(!questionsOrderRandom) }, 
    ];

    const onSubmit = async (formData) => {
        formData.questionsOrderRandom = questionsOrderRandom;
        await createEntity(formData);
    };  

    const handleFormRender = () => {
        return(
            <CreateNewQuestion />
        );
    };

    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Exam"} showQuestions={true} onRender={handleFormRender}/>
        </div>
    );
};
  
  export default CreateNewExam;
  
  
