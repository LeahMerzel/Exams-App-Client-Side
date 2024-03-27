import React, { useState, useEffect } from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000); 

    return () => clearInterval(interval);
  }, [duration]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100; 

  return (
    <Container>
      <Row>
        <Col>
          <h5>Time Left:</h5>
          <ProgressBar now={progress} label={formatTime(timeLeft)} />
        </Col>
      </Row>
    </Container>
  );
};

export default Timer;
