import React from "react";
import useFetch from "../../hooks/useFetch";
import useFilterableTable from "../../hooks/useFilterableTable";
import DataTable from "../../filterableTable/DataTable";
import SearchBar from '../../filterableTable/SearchBar';
import UpdateAnswer from './UpdateAnswer';
import { Spinner, Alert, Button } from "react-bootstrap";
import RemoveAnswer from "./RemoveAnswer";
import { useUser } from "../../auth/UserContext";

const GetQuestionAnswers = ({ questionId, onSelectAnswer }) => {
  const { userRole } = useUser();
  const getQuestionAnswersApiUrl = `https://localhost:7252/api/Question/${questionId}/answers`;
  const { data: answers, isLoading, error } = useFetch(getQuestionAnswersApiUrl);
  const { filterText, setFilterText, filteredData } = useFilterableTable(answers || []);

  const handleEdit = (item) => {
    return <UpdateAnswer answerId={item} />;
  };

  const handleDelete = (item) => {
    return <RemoveAnswer answerId={item} />
  };

  const handleSelectAnswer = (isCorrect) => {
    onSelectAnswer(isCorrect);
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {answers && userRole !== "Student" && (
        <div>
          <SearchBar filterText={filterText} setFilterText={setFilterText} />
          <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete}/>
        </div>
      )}
      {answers && userRole === "Student" && (
        <div>
          {answers && userRole === "Student" && (
        <div>
          {answers.map((answer) => (
            <div key={answer.id}>
              <h4>{answer.name}</h4>
              <p>{answer.description}</p>
              <Button onClick={() => handleSelectAnswer(answer.isCorrect)}>Select</Button>
            </div>
          ))}
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default GetQuestionAnswers;

