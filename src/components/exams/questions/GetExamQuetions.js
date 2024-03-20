import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useFilterableTable from "../../hooks/useFilterableTable";
import DataTable from "../../filterableTable/DataTable";
import SearchBar from "../../filterableTable/SearchBar";
import UpdateQuestion from './UpdateQuestion';
import { Spinner, Alert, Button } from "react-bootstrap";
import RemoveQuestion from "./RemoveQuestion";
import { useUser } from "../../auth/UserContext";
import GetQuestionAnswers from "../answers/GetQuestionAnswers";
import { useNavigate } from "react-router-dom";

const GetExamQuestions = ({ onFinishExam }) => {
  const { userRole, studentExamId } = useUser();
  console.log("in questions")
  const navigate = useNavigate(); // Initialize useNavigate
  const getExamQuestionsApiUrl = `https://localhost:7252/api/Exam/${studentExamId}/questions`;
  const { data: questions, isLoading, error } = useFetch(getExamQuestionsApiUrl);
  const { filterText, setFilterText, filteredData } = useFilterableTable(questions || []);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [grade, setGrade] = useState(null);
  const [failedList, setFailedList] = useState([]);

  useEffect(() => {
    calculateGrade();
  }, [selectedAnswers]);

  const handleEdit = (item) => {
    return <UpdateQuestion questionId={item} />;
  };

  const handleDelete = (item) => {
    return <RemoveQuestion questionId={item} />;
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleAnswerSelection = (questionId, isCorrect) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: isCorrect });
  };

  const calculateGrade = () => {
    if (!questions || !selectedAnswers) return;

    let totalScore = 0;
    let obtainedScore = 0;
    let failed = [];

    questions.forEach((question) => {
      const selectedAnswerId = selectedAnswers[question.id];
      if (selectedAnswerId !== undefined) {
        const selectedAnswer = question.answers.find(
          (answer) => answer.id === selectedAnswerId
        );
        if (selectedAnswer && selectedAnswer.isCorrect) {
          obtainedScore += question.questionScore;
        } else {
          failed.push(question);
        }
        totalScore += question.questionScore;
      }
    });

    setFailedList(failed);

    const gradePercentage = (obtainedScore / totalScore) * 100;
    setGrade(gradePercentage.toFixed(2));
  };

  const handleSubmitExam = () => {
    onFinishExam(grade, failedList);
    navigate("/take-exam");
  };

  return (
    <div>
      {isLoading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {questions && userRole !== "Student" && (
        <div>
          <SearchBar filterText={filterText} setFilterText={setFilterText} />
          <DataTable data={filteredData} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
      {questions && questions.length > 0 && (
        <div>
          <h3>{questions[currentQuestionIndex].name}</h3>
          <p>{questions[currentQuestionIndex].description}</p>
          <GetQuestionAnswers
            questionId={questions[currentQuestionIndex].id}
            onSelectAnswer={(isCorrect) =>
              handleAnswerSelection(questions[currentQuestionIndex].id, isCorrect)
            }
            selectedAnswers={selectedAnswers}
          />
          <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
            Next
          </Button>
          <Button onClick={handleSubmitExam}>Ready to Submit Exam</Button>
        </div>
      )}
    </div>
  );
};

export default GetExamQuestions;
