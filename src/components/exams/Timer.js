import React, { useState, useEffect } from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Convert duration from minutes to seconds

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
    }, 1000); // Set interval to 1 second

    return () => clearInterval(interval);
  }, [duration]); // Add duration as dependency to recalculate when it changes

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100; // Calculate progress based on total duration

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
