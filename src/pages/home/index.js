import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="head-title">Selamat datang di Quitest</h1>
      <p>Quitest adalah aplikasi quiz sederhana yang dibuat menggunakan ReactJS.</p>
      <p>Pada aplikasi website ini, kita bakal main tebak-tebakan soal.</p>
      <p>Sebelum main tebak-tebakan soal, kita login dulu ya.</p>
      <button className="login-button" onClick={() => {navigate("/login")}}>
        Login
      </button>
    </div>
  );
};

export default Home;
