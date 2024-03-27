// GetAllCourses.js

import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Alert, Card, Modal, Button } from "react-bootstrap";
import useFilterableTable from "../hooks/useFilterableTable";
import DataTable from "../filterableTable/DataTable";
import SearchBar from '../filterableTable/SearchBar';
import UpdateCourse from "./UpdateCourse";
import RemoveCourse from "./RemoveCourse";

const GetAllCourses = () => {
    const getAllCoursesApiUrl = "https://localhost:7252/api/Course/get-all";
    const { data: courses, isLoading, error, refetch } = useFetch(getAllCoursesApiUrl);
    const { filterText, setFilterText, filteredData } = useFilterableTable(courses || []);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleEdit = (courseId) => {
        setSelectedCourseId(courseId);
        setShowEditModal(true);
    };
    
    const handleDelete = (courseId) => {
        setSelectedCourseId(courseId);
        setShowDeleteModal(true);
    };
        
    const handleCloseModal = () => {
        setSelectedCourseId(null);
        setShowDeleteModal(false);
        setShowEditModal(false);
    };

    const handleCourseUpdated = () => {
        refetch(); 
    };

    
    const handleCourseRemoved = () => {
        refetch(); 
        handleCloseModal(); 
    };
  
    return (
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">Error: {error}</Alert>}
                {courses && (
                    <div>
                        <SearchBar filterText={filterText} setFilterText={setFilterText} />
                        <div style={{ overflowX: 'auto' }}>
                            <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                        <Modal show={showEditModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Course</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedCourseId && <UpdateCourse courseId={selectedCourseId} onUpdateSuccess={handleCourseUpdated} onHideModal={handleCloseModal} />}
                            </Modal.Body>
                        </Modal>
                        <Modal show={showDeleteModal} onHide={handleCloseModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Course</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!!selectedCourseId && <RemoveCourse courseId={selectedCourseId} onRemoveSuccess={handleCourseRemoved} />}
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

export default GetAllCourses;
