import React, { useState, useEffect } from "react";
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from "../hooks/useFetch";
import useUpdate from "../hooks/useUpdate";
import { useNavigate, useParams } from "react-router-dom";
import GetExamQuestions from "./questions/GetExamQuetions";
import CreateNewQuestion from "./questions/CreateNewQuestion";

const UpdateExam = () => {
  const navigate = useNavigate();
  const { examId } = useParams(); 
  const getExamApiUrl = `https://localhost:7252/api/Exam/get-by-id/${examId}`;
  const { data: entireExam, isLoading: isLoadingExam, error: examError} = useFetch(getExamApiUrl);
  const updateExamApiUrl = "https://localhost:7252/api/Exam/update";
  const { updateEntity, isLoading: isLoadingUpdate, error: updateError } = useUpdate(updateExamApiUrl);

  const [formData, setFormData] = useState({});
  const [renderQuestions, setRenderQuestions] = useState(false);
  const [renderAddQuestion, setRenderAddQuestion] = useState(false);

  useEffect(() => {
    if (entireExam) {
      setFormData(entireExam);
    }
  }, [entireExam]);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEntity(formData);
      if (response) {
        console.log(response)
        toast.success('Update successful!');
        navigate("/teacher-dashboard");
      }
    } catch (error) {
      console.error('Update failed:', error.message);
      toast.error('Update failed. Please try again.');
    }
  };

  const handleUpdateQuestions = () => {
    setRenderQuestions(true);
  };

  const handleAddQuestions = () => {
    setRenderAddQuestion(true);
  };

  const handleAddSuccess = () => {
    setRenderAddQuestion(false);
  };

  const handleCloseQuestions = () => {
    setRenderQuestions(false);
  };

  const handleGoBack = () => {
    navigate("/teacher-dashboard");
  };

  if (isLoadingExam || isLoadingUpdate) return <Spinner animation="border" />;
  if (examError || updateError) return <Alert variant="danger">Error: {examError || updateError}</Alert>;
  
  if (!entireExam) return null;

  const excludedProperties = ['id', 'createdAt', 'courseId', 'examGradeAvg', 'teacherId', 'examQuestions', 'studentsExams', 'wasExamLoggedInToByStudent'];
  return (
    <div>
      <h3 className="mt-3 mb-3">Edit Exam</h3>
                <Form className="mt-3" onSubmit={onSubmit}>
                  {Object.entries(formData)
                  .filter(([key]) => !excludedProperties.includes(key))
                  .map(([key, value]) => (
                    <Form.Group key={key}>
                            <Form.Label>{key}</Form.Label>
                            {key === 'isOrderQuestionsRandom' ? (
                            <Form.Check
                                type="checkbox"
                                label={key === "Randomize Questions Order" }
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
                  <Button className="mt-3" type="submit">Update Exam</Button>
                </Form>
                  {!renderQuestions && <Button className="mt-3" onClick={handleUpdateQuestions}>See Exam Questions</Button>}
                  {renderQuestions && <GetExamQuestions examId={examId} onCloseForm={handleCloseQuestions}/>}
                  <br/>
                  <Button className="mt-3" onClick={handleAddQuestions}>Add Question</Button>
                  {renderAddQuestion && <CreateNewQuestion examId={examId} onAddSuccess={handleAddSuccess}/>}
                  <p className=' mt-2 mb-5'>
                  <Button variant="link" onClick={handleGoBack}>Go back</Button>
                  </p>
    </div>
  );
};

export default UpdateExam;
