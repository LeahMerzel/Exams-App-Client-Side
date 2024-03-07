import React, {useState} from "react";
import { Spinner, Alert } from "react-bootstrap";
import useCreate from "../hooks/useCreate";
import Form from "../forms/Form";
import CreateNewQuestion from "./questions/CreateNewQuestion";
import { useUser } from "../auth/UserContext";

const CreateNewExam = () => {
    const {user} = useUser();
    const createExamApiUrl = "https://localhost:7252/api/Exam/create";
    const { createEntity, isLoading, error } = useCreate(createExamApiUrl);
    const [questionsOrderRandom, setQuestionsOrderRandom] = useState(false); 
    const [examId, setExamId] = useState();

    const fields = [
        { name: "examName", label: "Exam Name", type: "text" },
        { name: "examDescription", label: "Exam Description", type: "text" },
        { name: "course", label: "Course", type: "select", options: [] },
        { name: "examDateTime", label: "Exam Date and Time", type: "datetime-local" },
        { name: "examDurationInMinutes", label: "Exam Duration In Minutes", type: "number" },
        { name: "questionsOrder", label: "Set Question Order to Random", type: "checkbox", checked: questionsOrderRandom, onChange: () => setQuestionsOrderRandom(!questionsOrderRandom) }, 
    ];

    const onSubmit = async (formData) => {
        formData.id = user.userId;
        formData.questionsOrderRandom = questionsOrderRandom;
        const response = await createEntity(formData);
        setExamId(response.id);
    };  

    const handleFormRender = () => {
        return(
            <CreateNewQuestion examId={examId}/>
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
  
  
