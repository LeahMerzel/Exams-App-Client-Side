import React, {useState} from "react";
import useFetch from "../../hooks/useFetch";
import UpdateAnswer from './UpdateAnswer';
import { Spinner, Alert, Button, Form } from "react-bootstrap";
import RemoveAnswer from "./RemoveAnswer";

const GetQuestionAnswers = ({ questionId }) => {
  const getQuestionAnswersApiUrl = `https://localhost:7252/api/Question/${questionId}/answers`;
  const { data: answers, isLoading, error, refetch } = useFetch(getQuestionAnswersApiUrl);

  const [selectedAnswerId, setSelectedAnswerId] = useState(null);
  const [deleteAnswer, setDeleteAnswer] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleEdit = (answerId) => {
    setSelectedAnswerId(answerId);
  };

  const handleDelete = (answerId) => {
    setDeleteAnswer(answerId);
  };

  const handleDeleteSuccess = () => {
    setDeleteAnswer(null); 
    setShowForm(false);
    refetch();
  };
  

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {answers && showForm &&(
        <div>
          {answers.map((answer) => (
            <div className="mt-2" key={answer.id}>
              <Form>
                <Form.Group controlId={`answer${answer.id}`}>
                <Form.Label>Answer Number:</Form.Label>
                  <Form.Control
                    type="text"
                    value={answer.answerNumber}
                    readOnly
                  />
                  <Form.Label>Answer Description:</Form.Label>
                  <Form.Control
                    type="text"
                    value={answer.answerDescription}
                    readOnly
                  />
                </Form.Group>
              </Form>
              <Button className="m-2 mt-3" variant="primary" onClick={() => handleEdit(answer.id)}>Edit</Button>
              <Button className="m-2 mt-3" variant="danger" onClick={() => handleDelete(answer.id)}>Delete</Button>
              {selectedAnswerId === answer.id && <UpdateAnswer answerId={answer.id} />}
              {deleteAnswer === answer.id && <RemoveAnswer answerId={answer.id} onDeleteSuccess={handleDeleteSuccess}/>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetQuestionAnswers;

