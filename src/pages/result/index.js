import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/result.css";

const Result = () => {
  const navigate = useNavigate();
  const { correctAnswers, wrongAnswers, unansweredQuestions } = useLocation().state;

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="result-container">
      <h2>Quiz Result</h2>
      <p>Correct Answers: {correctAnswers}</p>
      <p>Wrong Answers: {wrongAnswers}</p>
      <p>Unanswered Questions: {unansweredQuestions}</p>
      <button onClick={handleRestart}>Go home</button>
    </div>
  );
};

export default Result;
