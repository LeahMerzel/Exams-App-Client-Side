import React, { useState, useEffect} from "react";
import useUpdate from "../../hooks/useUpdate";
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import useFetch from '../../hooks/useFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateQuestion = ({questionId}) => {
    const getQuestionApiUrl = `https://localhost:7252/api/Question/get-by-id/${questionId}`;
    const { data: questionToUpdate, isLoading: isLoadingQuestion, error: questionError} = useFetch(getQuestionApiUrl);  
    const updateQuestionApiUrl = "https://localhost:7252/api/Question/update";
    const { updateEntity, isLoading: isLoadingUpdate, error: updateError } = useUpdate(updateQuestionApiUrl);

    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        if (questionToUpdate) {
          setFormData(questionToUpdate);
        }
      }, [questionToUpdate]);
    
      const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const [fieldName, fieldIndex, subFieldName] = name.split('.');
        if (type === 'checkbox') {
          setFormData(prevData => ({
            ...prevData,
            [name]: checked 
          }));
        } else if (fieldIndex !== undefined && subFieldName !== undefined) {
          const updatedData = { ...formData };
          updatedData[fieldName][fieldIndex][subFieldName] = value;
          setFormData(updatedData);
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
          
      const handleUpdateQuestions = async (e) => {
        e.preventDefault();
        try {
          const response = await updateEntity(formData);
          if (response) {
            console.log(response)
            toast.success('Update successful!');
            setShowForm(false);
          }
        } catch (error) {
          console.error('Update failed:', error.message);
          toast.error('Update failed. Please try again.');
        }
      };

      const handleCancel = () => {
        setShowForm(false);
      }
    
      if (isLoadingQuestion || isLoadingUpdate) return <Spinner animation="border" />;
      if (questionError || updateError) return <Alert variant="danger">Error: {questionError || updateError}</Alert>;
      
      if (!questionToUpdate) return null;
    
      const excludedProperties = ['id', 'createdAt', 'examId', 'answers', 'correctAnswerDescription', 'imageData', 'contentType', 'imageUrl'];

    return (
        <div>
            {showForm && (
                <Form className="mt-3" >
                    {Object.entries(formData)
                        .filter(([key]) => !excludedProperties.includes(key))
                        .map(([key, value]) => (
                        <Form.Group key={key}>
                            <Form.Label>{key}</Form.Label>
                            {key === 'isOrderAnswersRandom' || key === 'isImage' ? (
                            <Form.Check
                                type="checkbox"
                                label={key === 'isOrderAnswersRandom' ? "Randomize Answers Order" : "Is Image"}
                                name={key}
                                checked={!!value} // Ensure value is a boolean
                                onChange={handleInputChange}
                            />
                            ) : (
                            <Form.Control
                                type="text"
                                name={key}
                                value={value}
                                onChange={handleInputChange}
                            />
                            )}
                        </Form.Group>
                        ))}
                    <Button className="mt-3" onClick={handleUpdateQuestions}>Update Question</Button>
                    <Button className="mt-3" variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
                </Form>
            )}
        </div>
    );
};
  
export default UpdateQuestion;
