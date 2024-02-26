import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import { Button } from "react-bootstrap";

function DataTable({ data, onEdit, onDelete, onTakeExam, onGetSubmitted, studentExam }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  if (!data || data.length === 0) {
    console.log("Data is null, undefined, or empty:", data);
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
        {!studentExam ? (
          <>
            <Button onClick={() => onEdit(item.id)}>Edit</Button>
            <Button onClick={() => onDelete(item.id)}>Delete</Button>
            <Button onClick={() => onGetSubmitted(item.id)}>See Students' Submitted Exams</Button>
          </>
        ) : (
          <button onClick={() => onTakeExam(item)}>Take Exam</button>
        )}
      </td>
    </tr>
  ));

  return (
    <>
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
    </>
  );
}

export default DataTable;
