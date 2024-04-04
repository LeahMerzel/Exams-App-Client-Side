import React, { useState} from "react";
import useFetch from "../../hooks/useFetch";
import UpdateQuestion from './UpdateQuestion';
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import RemoveQuestion from "./RemoveQuestion";
import GetQuestionAnswers from "../answers/GetQuestionAnswers";
import CreateNewAnswer from "../answers/CreateNewAnswer";
import DisplayImage from '../../image handling/DisplayImage'; 

const GetExamQuestions = ({ examId, onCloseForm }) => {
  const getExamQuestionsApiUrl = `https://localhost:7252/api/Exam/${examId}/questions`;
  const { data: questions, isLoading, error, refetch } = useFetch(getExamQuestionsApiUrl);
  console.log(questions)

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [deleteQuestion, setDeleteQuestion] = useState(null);
  const [viewAnswers, setViewAnswers] = useState(null);
  const [addAnswer, setAddAnswer] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleEdit = (questionId) => {
    setSelectedQuestionId(questionId);
  };

  const handleDelete = (questionId) => {
    setDeleteQuestion(questionId);
  };

  const handleViewAnswers = (questionId) => {
    setViewAnswers(questionId);
  };

  const handleDeleteSuccess = () => {
    setDeleteQuestion(null);
    setShowForm(false);
    refetch();
  };

  const handleAddAnswer = (questionId) => {
    setAddAnswer(questionId);
  };

  const handleAddSuccess = () => {
    setAddAnswer(null);
    refetch();
  };

  const handleCancel = () => {
    setShowForm(false);
    onCloseForm();
  }

  return (
    <div className="mt-3">
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {questions && showForm &&(
        <div>
          {questions.map((question) => (
            <div className="mt-2" key={question.id}>
              <Form>
                <Form.Group controlId={`question_${question.id}`}>
                  <Form.Label>Question Number:</Form.Label>
                  <Form.Control
                    type="text"
                    value={question.questionNumber}
                    readOnly
                  />
                  <Form.Label>Question Description:</Form.Label>
                  <Form.Control
                    type="text"
                    value={question.questionDescription}
                    readOnly
                  />
                  {question.imageUrl && <DisplayImage imageUrl={question.imageUrl} />} {/* Display the image if it exists */}
                </Form.Group>
              </Form>
              <Button className="m-2 mt-3" variant="primary" onClick={() => handleEdit(question.id)}>Edit</Button>
              <Button className="m-2 mt-3" variant="primary" onClick={() => handleViewAnswers(question.id)}>View Answers</Button>
              <Button className="m-2 mt-3" variant="primary" onClick={() => handleAddAnswer(question.id)}>Add Answer</Button>
              <Button className="m-2 mt-3" variant="danger" onClick={() => handleDelete(question.id)}>Delete</Button>
              {selectedQuestionId === question.id && <UpdateQuestion questionId={question.id} />}
              {deleteQuestion === question.id && <RemoveQuestion questionId={question.id} onDeleteSuccess={handleDeleteSuccess}/>}
              {viewAnswers === question.id && <GetQuestionAnswers questionId={question.id} />}
              {addAnswer === question.id && <CreateNewAnswer questionId={question.id} onAddSuccess={handleAddSuccess}/>}
            </div>
          ))}
          <Button className="mt-3" variant="secondary" onClick={handleCancel}>Close Exam's Questions</Button>
        </div>
      )}
    </div>
  );
};

export default GetExamQuestions;
