import React from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateUser from "./UpdateUser";
import { Spinner, Alert } from "react-bootstrap";
import { useUser } from '../auth/UserContext';

const GetAllUsers = ({courseId}) => {
    const { userRole, token} = useUser();
    const getAllUsersApiUrl = userRole === 0
    ? "https://localhost:7252/api/Auth/get-all"
    : `https://localhost:7252/api/Course/${courseId}/course-students`;  
    
    const { data: users, isLoading, error } = useFetch(token, getAllUsersApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(users);

    const handleEdit = (item) => {
        return <UpdateUser item={item} />;
    };
  
    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {users && (
                <div>
                    <SearchBar filterText={filterText} setFilterText={setFilterText} />
                    <DataTable data={filteredData} onEdit={handleEdit} />
                </div>
            )}
        </div>
    );
};

export default GetAllUsers;
