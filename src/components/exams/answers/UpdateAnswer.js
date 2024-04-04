import React, { useState, useEffect} from "react";
import useUpdate from "../../hooks/useUpdate";
import { Spinner, Alert, Form, Button } from "react-bootstrap";
import useFetch from '../../hooks/useFetch';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateAnswer = ({answerId}) => {
    const getAnswerApiUrl = `https://localhost:7252/api/Answer/get-by-id/${answerId}`;
    const { data: answerToUpdate, isLoading: isLoadingAnswer, error: answerError} = useFetch(getAnswerApiUrl);  
    const updateAnswerApiUrl = "https://localhost:7252/api/Answer/update";
    const { updateEntity, isLoading: isLoadingUpdate, error: updateError } = useUpdate(updateAnswerApiUrl);

    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        if (answerToUpdate) {
          setFormData(answerToUpdate);
        }
      }, [answerToUpdate]);
    
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

      const handleUpdateAnswer = async (e) => {
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
    
      if (isLoadingAnswer || isLoadingUpdate) return <Spinner animation="border" />;
      if (answerError || updateError) return <Alert variant="danger">Error: {answerError || updateError}</Alert>;
      
      if (!answerToUpdate) return null;
    
      const excludedProperties = ['id', 'createdAt', 'questionId'];

    return (
        <div>
            {showForm && (
                <Form className="mt-3" >
                    {Object.entries(formData)
                        .filter(([key]) => !excludedProperties.includes(key))
                        .map(([key, value]) => (
                        <Form.Group key={key}>
                            <Form.Label>{key}</Form.Label>
                            { key === 'isCorrect' ? (
                            <Form.Check
                                type="checkbox"
                                label={key === "Answer is Correct"}
                                name={key}
                                checked={!!value} 
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
                    <Button className="mt-3" onClick={handleUpdateAnswer}>Update Question</Button>
                    <Button className="mt-3" variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>Cancel</Button>
                </Form>
            )}
        </div>
    );
};
  
export default UpdateAnswer;
