import React, { useState, useEffect } from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

const Timer = ({ timeLeft }) => {
  const [timer, setTimer] = useState(timeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = ((timeLeft - timer) / timeLeft) * 100;

  return (
    <Container>
      <Row>
        <Col>
          <h5>Time Left:</h5>
          <ProgressBar now={progress} label={formatTime(timer)} />
        </Col>
      </Row>
    </Container>
  );
};

export default Timer;
