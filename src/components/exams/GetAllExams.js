import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateExam from './UpdateExam';
import GetSubmitedExams from "./GetSubmitedExams";
import { useUser } from '../auth/UserContext';

const GetAllExams = ({token, id}) => {
  const { userRole } = useUser();
  const getAllExamsApiUrl = userRole === 0
  ? "https://localhost:7252/api/Exam/get-all"
  : `https://localhoast:7252/api/Teacher/${id}/exams`;
  
    const { data: exams, isLoading, error } = useFetch(token, getAllExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(exams || []);

    const handleEdit = (item) => {
      return <UpdateExam item={item} />;
    };
  
    const onGetSubmitted = (exam) => {
      return <GetSubmitedExams examId={exam.id} />;
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
