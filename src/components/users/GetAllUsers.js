import React from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateUser from "./UpdateUser";
import { Spinner, Alert } from "react-bootstrap";
import RemoveUser from "./RemoveUser";

const GetAllUsers = () => {
    const getAllUsersApiUrl = "https://localhost:7252/api/Auth/get-all";
    const { data: users, isLoading, error } = useFetch(getAllUsersApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(users);

    const handleEdit = (item) => {
        return <UpdateUser userId={item} />;
    };

    const handleDelete = (item) => {
        return <RemoveUser userId={item} />
    };
  
    return (
        <div>
            {isLoading && <Spinner animation="border" />}
            {error && <Alert variant="danger">Error: {error}</Alert>}
            {users && (
                <div>
                    <SearchBar filterText={filterText} setFilterText={setFilterText} />
                    <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            )}
        </div>
    );
};

export default GetAllUsers;
