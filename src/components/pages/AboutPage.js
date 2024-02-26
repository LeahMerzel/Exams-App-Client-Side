// AboutPage.js
import React from 'react';
import { Container } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <h3>About My Exams App</h3>
      <br/>
      <p>
        Welcome to my Exams App, a platform designed for teachers to create exams and for students
        to take them and receive grades.
      </p>
      <p>
        <strong>For Teachers:</strong> Easily create and manage exams. Define questions,
        set exam details, and organize questions as needed.
      </p>
      <p>
        <strong>For Students:</strong> Access exams created by your teachers, answer questions,
        and receive grades instantly.
      </p>
      <p>
        This app aims to simplify the exam creation and taking process, making it efficient and
        user-friendly for both teachers and students.
      </p>
      </Container>
    </div>
  );
};

export default AboutPage;
