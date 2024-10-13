import React from 'react'
import { useNavigate } from 'react-router-dom';

import "../../styles/result.css";

const Result = ({ score, totalQuestions }) => {
    const navigate = useNavigate();
  
    const handleRestart = () => {
      localStorage.removeItem('quizState');
      navigate('/');
    };
  
    return (
      <div className='result-container'>
        <h2>Quiz Result</h2>
        <p>Correct Answers: {score}</p>
        <p>Total Questions: {totalQuestions}</p>
        <button onClick={handleRestart}>Go home</button>
      </div>
    );
  };
  
  export default Result;