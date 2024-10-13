import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/quiz.css";

const Quiz = () => {
  const [quizState, setQuizState] = useState(() => {
    const savedState = localStorage.getItem("quizState");
    return savedState !== null
      ? JSON.parse(savedState)
      : {
          questions: [],
          currentQuestionIndex: 0,
          score: 0,
          timeLeft: 150,
          answeredQuestions: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          user: "",
          token: "",
        };
  });
  const navigate = useNavigate();

  useEffect(() => {
    const setQuestions = (questions) => {
      setQuizState((prevState) => ({
        ...prevState,
        questions,
      }));
    };

    const fetchUser = async () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setQuizState((prevState) => ({
          ...prevState,
          user: JSON.parse(userData).username,
          token: JSON.parse(userData).token,
        }));
      }
    };

    const loadQuestions = async () => {
      const storedQuestions = localStorage.getItem("questions");
      if (storedQuestions) {
        setQuizState((prevState) => ({
          ...prevState,
          questions: JSON.parse(storedQuestions),
        }));
      } else {
        setTimeout(() => {
          fetch(
            `https://opentdb.com/api.php?amount=${5}&category=${27}&token=${quizState.token}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              setQuestions(data.results);
              localStorage.setItem("questions", JSON.stringify(data.results));
            })
            .catch((err) => {
              console.log(err.message);
            }, 1000);
        });
      }
    };

    fetchUser().then(() => {
      loadQuestions();
    });
  }, []);

  useEffect(() => {
    if (quizState.timeLeft > 0) {
      const timer = setInterval(() => {
        setQuizState((prevState) => ({
          ...prevState,
          timeLeft: prevState.timeLeft - 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    } else {
      localStorage.removeItem("quizState");
      localStorage.removeItem("userData");
      localStorage.removeItem("questions");
      navigate("/result", {
        state: {
          score: quizState.score,
          totalQuestions: quizState.questions.length,
          correctAnswers: quizState.correctAnswers,
          wrongAnswers: quizState.wrongAnswers,
          unansweredQuestions:
            quizState.questions.length - quizState.answeredQuestions,
        },
      });
    }
  }, [quizState.timeLeft, navigate, quizState]);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify(quizState));
  }, [quizState]);

  const handleAnswer = (isCorrect) => {
    setQuizState((prevState) => {
      const newScore = isCorrect ? prevState.score + 1 : prevState.score;
      const newCorrectAnswers = isCorrect
        ? prevState.correctAnswers + 1
        : prevState.correctAnswers;
      const newWrongAnswers = isCorrect
        ? prevState.wrongAnswers
        : prevState.wrongAnswers + 1;
      const newAnsweredQuestions = prevState.answeredQuestions + 1;
      const newCurrentQuestionIndex = prevState.currentQuestionIndex + 1;

      if (newCurrentQuestionIndex < prevState.questions.length) {
        return {
          ...prevState,
          score: newScore,
          correctAnswers: newCorrectAnswers,
          wrongAnswers: newWrongAnswers,
          answeredQuestions: newAnsweredQuestions,
          currentQuestionIndex: newCurrentQuestionIndex,
        };
      } else {
        localStorage.removeItem("quizState");
        localStorage.removeItem("userData");
        localStorage.removeItem("questions");
        navigate("/result", {
          state: {
            score: newScore,
            totalQuestions: prevState.questions.length,
            correctAnswers: newCorrectAnswers,
            wrongAnswers: newWrongAnswers,
            unansweredQuestions:
              prevState.questions.length - newAnsweredQuestions,
          },
        });
        return prevState;
      }
    });
  };

  return (
    <div className="quiz-container">
      {quizState.questions.length > 0 &&
      quizState.currentQuestionIndex < quizState.questions.length ? (
        <div>
          <div className="header-container">
            <h3>{quizState.user}</h3>
            <div className="sub-header-container">
              <h2>Question</h2>
              <h2 className="question-number">
                {quizState.currentQuestionIndex + 1}
              </h2>
              <h2>of</h2>
              <h2 className="question-number">{quizState.questions.length}</h2>
            </div>
          </div>
          <p>{quizState.questions[quizState.currentQuestionIndex].question}</p>
          <div className="answer-options-container">
            {quizState.questions[
              quizState.currentQuestionIndex
            ].incorrect_answers
              .concat(
                quizState.questions[quizState.currentQuestionIndex]
                  .correct_answer
              )
              .map((answer, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswer(
                      answer ===
                        quizState.questions[quizState.currentQuestionIndex]
                          .correct_answer
                    )
                  }
                >
                  {answer}
                </button>
              ))}
          </div>
          <p>Time left: {quizState.timeLeft}s</p>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
