import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateExam from './UpdateExam';
import GetSubmitedExams from "./GetSubmitedExams";

const GetAllExams = ({token, id}) => {
    let getAllExamsApiUrl = id ? `https://localhoast:7252/api/Teacher/${id}/exams` : "https://localhost:7252/api/Exam/get-all";
    const { data: exams, isLoading, error } = useFetch(token, getAllExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(exams || []);

    const handleEdit = (item) => {
      <UpdateExam item={item} />;
    };
  
    const onGetSubmitted = (exam) => {
      <GetSubmitedExams examId={exam.id} />;
    };

    return (
        <div>
          {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          {exams && (
            <div>
              <SearchBar filterText={filterText} setFilterText={setFilterText} />
              <DataTable data={filteredData} onEdit={handleEdit} onGetSubmitted={onGetSubmitted}/>
            </div>
          )}
        </div>
    );
};
  
export default GetAllExams;
