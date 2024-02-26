import React from 'react';
import { Container } from 'react-bootstrap';

const ContactPage = () => {
  return (
    <div>
    <Container className="align-items-center mt-3 mb-5 p-3">
      <h3>Contact Information</h3>
      <p>
        If you have any questions or concerns, feel free to reach out to me:
      </p>
      <ul>
        <li>Email: <a href="mailto:leahwalden4@gmail.com">leahwalden4@gmail.com</a></li>
        <li>Phone: 052-719-4137</li>
      </ul>
      </Container>
    </div>
  );
};

export default ContactPage;
