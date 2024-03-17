import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateUser from "./UpdateUser";
import { Spinner, Alert, Card, Modal, Button } from "react-bootstrap";
import RemoveUser from "./RemoveUser";

const GetAllUsers = () => {
    const getAllUsersApiUrl = "https://localhost:7252/api/User/get-all";
    const { data: users, isLoading, error } = useFetch(getAllUsersApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(users);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = (userId) => {
        setSelectedUserId(userId);
        setShowEditModal(true);
    };
    
    const handleDelete = (userId) => {
        setSelectedUserId(userId);
        setShowDeleteModal(true);
    };
        
    const handleCloseModal = () => {
        setSelectedUserId(null);
        setShowDeleteModal(false);
        setShowEditModal(false);
    };
  
    return (
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {users && (
                    <div>
                        <SearchBar filterText={filterText} setFilterText={setFilterText} />
                        <div style={{ overflowX: 'auto' }}>
                            <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                        <Modal show={showEditModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedUserId && <UpdateUser userId={selectedUserId} />}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={showDeleteModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedUserId && <RemoveUser userId={selectedUserId} />}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseModal}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default GetAllUsers;
