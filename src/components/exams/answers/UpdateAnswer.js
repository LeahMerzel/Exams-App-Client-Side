import React, { useState} from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";

const UpdateAnswer = ({item}) => {
    const updateAnswerApiUrl = "https://localhost:7252/api/Answer/update";
    const { updateEntity, isLoading, error } = useUpdate(updateAnswerApiUrl);
    const [imageFile, setImageFile] = useState(null); 
    const [ answerIsCorrect, setAnswerIsCorrect] = useState(false);

    const fields = [
        { name: "answerNumber", label: "Answer Number", type: "number" },
        { name: "answerDescription", label: "Answer Description", type: "text" },
        { name: "isCorrect", label: "Is The Answer Correct", type: "checkbox", checked: answerIsCorrect, onChange: () => setAnswerIsCorrect(!answerIsCorrect) }, 
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
            <Form fields={fields} onSubmit={onSubmit} entityName={"Answer"}/>
        </div>
    );
};
  
export default UpdateAnswer;
