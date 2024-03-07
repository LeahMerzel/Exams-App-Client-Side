import React from "react";
import useFetch from "../../hooks/useFetch";
import useFilterableTable from "../../hooks/useFilterableTable";
import DataTable from "../../filterableTable/DataTable";
import SearchBar from '../../filterableTable/SearchBar';
import UpdateAnswer from './UpdateAnswer';
import { Spinner, Alert } from "react-bootstrap";
import RemoveAnswer from "./RemoveAnswer";

const GetQuestionAnswers = (questionId) => {
    const getQuestionAnswersApiUrl = `https://localhost:7252/api/Question/${questionId}/answers`;
    const { data: answers, isLoading, error } = useFetch(getQuestionAnswersApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(answers || []);

    const handleEdit = (item) => {
      return <UpdateAnswer answerId={item} />;
    };

    const handleDelete = (item) => {
      return <RemoveAnswer answerId={item} />
    };
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {answers && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete}/>
          </div>
        )}
      </div>
    );
  };
  
  export default GetQuestionAnswers;