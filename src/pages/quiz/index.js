import React, { useState, useEffect } from "react";
import { fetchQuestions } from "./../../api/axios.js";
import { useNavigate } from "react-router-dom";
import "../../styles/quiz.css";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
    };

    loadQuestions();

    const savedState = JSON.parse(localStorage.getItem("quizState"));
    if (savedState) {
      setQuestions(savedState.questions);
      setCurrentQuestionIndex(savedState.currentQuestionIndex);
      setScore(savedState.score);
      setAnsweredQuestions(savedState.answeredQuestions);
      setTimeLeft(savedState.timeLeft);
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      navigate("/result");
    }
  }, [timeLeft, navigate]);

  useEffect(() => {
    localStorage.setItem(
      "quizState",
      JSON.stringify({
        questions,
        currentQuestionIndex,
        score,
        answeredQuestions,
        timeLeft,
      })
    );
  }, [questions, currentQuestionIndex, score, answeredQuestions, timeLeft]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    setAnsweredQuestions(answeredQuestions + 1);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate("/result");
    }
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div>
          <div className="header-container">
            <h2>Question</h2>
            <h2 className="question-number">{currentQuestionIndex + 1}</h2>
            <h2>of</h2>
            <h2 className="question-number">{questions.length}</h2>
          </div>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="answer-options-container">
            {questions[currentQuestionIndex].incorrect_answers
              .concat(questions[currentQuestionIndex].correct_answer)
              .map((answer, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(
                      answer === questions[currentQuestionIndex].correct_answer
                    )
                  }
                >
                  {answer}
                </button>
              ))}
          </div>
          <p>Time left: {timeLeft}s</p>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
