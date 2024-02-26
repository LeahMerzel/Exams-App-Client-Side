import React from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateAnswer from './UpdateAnswer';
import { Spinner, Alert } from "react-bootstrap";

const GetQuestionAnswers = ({question}) => {
    const getQuestionAnswersApiUrl = `https://localhost:7252/api/Question/${question.id}/answers`;
    const { data: answers, isLoading, error } = useFetch(getQuestionAnswersApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(answers || []);

    const handleEdit = (item) => {
      <UpdateAnswer item={item} />;
    };
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {answers && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onEdit={handleEdit} />
          </div>
        )}
      </div>
    );
  };
  
  export default GetQuestionAnswers;