import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Button , Container} from "react-bootstrap";
import { useUser } from "../auth/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; 

function DataTable({ data, onEdit, onDelete, onTakeExam, onGetSubmitted, onCourseExams, entityName, onGetGradeAvg }) {
  const {userRole} = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const rows = currentItems.map((item, index) => (
    <tr key={index}>
      {Object.values(item).map((value, i) => (
        <td key={i}>{String(value)}</td>
      ))}
      <td>
        {(entityName === "users" && userRole === "Admin") && (
          <>
            <Button onClick={() => onEdit(item.id)}>
              <FontAwesomeIcon icon={faEdit} size="1x" style={{ marginBottom: '5px', display: 'block' }} />
              Edit
            </Button>
            <Button onClick={() => onDelete(item.id)}>
              <FontAwesomeIcon icon={faTrashAlt} size="1x" style={{ marginBottom: '5px', display: 'block' }} />
              Delete
            </Button>
          </>
        )}
        { (entityName !== "users" && userRole !== "Student")  ? (
          <>
            <Button onClick={() => onEdit(item.id)}>
              <FontAwesomeIcon icon={faEdit} size="1x" style={{ marginBottom: '5px', display: 'block' }} />
              Edit
            </Button>
            <Button onClick={() => onDelete(item.id)}>
              <FontAwesomeIcon icon={faTrashAlt} size="1x" style={{ marginBottom: '5px', display: 'block' }} />
              Delete
            </Button>
            {onGetGradeAvg && <Button onClick={() => onGetGradeAvg(item.id)}>Exam's Grade Avg</Button>}
          </>
        ) : (
          <>
            {onTakeExam && <Button onClick={() => onTakeExam(item)}>
            <FontAwesomeIcon icon={faPenToSquare} size="1x" style={{ marginBottom: '5px', display: 'block' }} />
              Take Exam</Button>}
            {onCourseExams && <Button onClick={() => onCourseExams(item.id)}>See Course's Exams</Button>}
          </>
        )}
      </td>
    </tr>
  ));

  return (
    <Container >
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(data[0]).map((key, index) => (
              <th key={index}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={prevPage} />
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={nextPage} />
      </Pagination>
    </Container>
  );
}

export default DataTable;
