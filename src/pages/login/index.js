import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username) {
      alert("Username tidak boleh kosong!");
      return;
    }
    
    localStorage.setItem("user", username);
    navigate("/quiz");
  };

  return (
    <div className="login-container">
      <div className="card-container">
        <h2>Login</h2>
        <input
          className="input-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
