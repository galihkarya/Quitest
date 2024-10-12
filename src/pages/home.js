import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz"); // Mengarahkan user ke halaman QuizPage
  };

  return (
    <div className="home-container">
      <h1 className="head-title">Selamat datang di Quitest</h1>
      <p className="body-home">
        Quitest adalah aplikasi quiz sederhana yang dibuat menggunakan ReactJS.
      </p>
      <p>Pada aplikasi website ini, kita bakal main tebak-tebakan soal.</p>
      <button className="login-button" onClick={startQuiz}>
        Login
      </button>
    </div>
  );
};

export default Home;
