import React, { useState} from "react";
import useUpdate from "../hooks/useUpdate";
import Form from "../forms/Form";
import { Spinner, Alert } from "react-bootstrap";

const UpdateQuestion = ({item}) => {
    const updateQuestionApiUrl = "https://localhost:7252/api/Question/update";
    const { updateEntity, isLoading, error } = useUpdate(updateQuestionApiUrl);
    const [imageFile, setImageFile] = useState(null); 
    const [ questionIsImage, setQuestionIsImage] = useState(false);
    const [ answersOrderRandom, setAnswersOrderRandom] = useState(false); 

    const fields = [
        { name: "questionNumber", label: "Question Number", type: "number" },
        { name: "questionDescription", label: "Question Description", type: "text" },
        { name: "questionIsImage", label: "Set Question to Image", type: "checkbox", checked: questionIsImage, onChange: () => setQuestionIsImage(!questionIsImage) }, 
        { name: "answersOrder", label: "Set Answers Order to Random", type: "checkbox", checked: answersOrderRandom, onChange: () => setAnswersOrderRandom(!answersOrderRandom) }, 
        { name: "questionScoring", label: "Question Scoring", type: "number" },
        { name: "exam", label: "Exam", type: "select", options: [] },
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
            <Form fields={fields} onSubmit={onSubmit} entityName={"Question"}/>
        </div>
    );
};
  
export default UpdateQuestion;
