import React, { useState} from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";

const UpdateExam = ({item}) => {
    const updateExamApiUrl = "https://localhost:7252/api/Exam/update";
    const { updateEntity, isLoading, error } = useUpdate(updateExamApiUrl);
    const [imageFile, setImageFile] = useState(null); 
    const [questionsOrderRandom, setQuestionsOrderRandom] = useState(false); 

    const fields = [
        { name: "examName", label: "Exam Name", type: "text" },
        { name: "examDescription", label: "Exam Description", type: "text" },
        { name: "course", label: "Course", type: "select", options: [] },
        { name: "examDateTime", label: "Exam Date and Time", type: "datetime-local" },
        { name: "examDurationInMinutes", label: "Exam Duration In Minutes", type: "number" },
        { name: "questionsOrder", label: "Set Question Order to Random", type: "checkbox", checked: questionsOrderRandom, onChange: () => setQuestionsOrderRandom(!questionsOrderRandom) }, 
    ];

    const onSubmit = async (formData) => {
        const formDataWithImage = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataWithImage.append(key, value);
        });
        formDataWithImage.append("image", imageFile);
        await updateEntity(item.id, formDataWithImage);
        setImageFile(null);
    };


    return (
        <div>
        {isLoading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Error: {error}</Alert>}
            <Form fields={fields} onSubmit={onSubmit} entityName={"Exam"}/>
        </div>
    );
};
  
export default UpdateExam;
