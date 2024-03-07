import React from "react";
import useFetch from "../../hooks/useFetch";
import useFilterableTable from "../../hooks/useFilterableTable";
import DataTable from "../../filterableTable/DataTable";
import SearchBar from "../../filterableTable/SearchBar";
import UpdateQuestion from './UpdateQuestion';
import { Spinner, Alert } from "react-bootstrap";

const GetExamQuetions = (examId) => {
    const getExamQuestionsApiUrl = `https://localhost:7252/api/Exam/${examId}/questions`;
    const { data: questions, isLoading, error } = useFetch(getExamQuestionsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(questions || []);

    const handleEdit = (item) => {
      <UpdateQuestion questionId={item} />;
    };
  
    return (
      <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
        {questions && (
          <div>
            <SearchBar filterText={filterText} setFilterText={setFilterText} />
            <DataTable data={filteredData} onEdit={handleEdit} />
          </div>
        )}
      </div>
    );
  };
  
  export default GetExamQuetions;