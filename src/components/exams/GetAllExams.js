import React from "react";
import { Spinner, Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateExam from './UpdateExam';
import GetSubmitedExams from "./GetSubmitedExams";
import { useUser } from '../auth/UserContext';
import RemoveExam from "./RemoveExam";

const GetAllExams = () => {
  const {user, userRole } = useUser();
  const getAllExamsApiUrl = userRole === "Admin"
  ? "https://localhost:7252/api/Exam/get-all"
  : `https://localhost:7252/api/User/${user.userId}/teacher-exams`;
  
    const { data: exams, isLoading, error } = useFetch(getAllExamsApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(exams || []);

    const handleEdit = (item) => {
      return <UpdateExam examId={item} />;
    };
  
    const onGetSubmitted = (item) => {
      return <GetSubmitedExams examId={item} />;
    };

    const handleDelete = (item) => {
      return <RemoveExam examId={item}/>
    };

    return (
        <div>
          {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">Error: {error}</Alert>}
          {exams && (
            <div>
              <SearchBar filterText={filterText} setFilterText={setFilterText} />
              <DataTable data={filteredData} onEdit={handleEdit} onGetSubmitted={onGetSubmitted} onDelete={handleDelete}/>
            </div>
          )}
        </div>
    );
};
  
export default GetAllExams;
