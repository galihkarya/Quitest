import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

const Login = () => {
  useEffect(() => {
    const user = localStorage.getItem("userData");
    if (user) {
      navigate("/quiz");
    }
  }, []);

  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username) {
      alert("Username cannot be empty!");
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://opentdb.com/api_token.php?command=request"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        localStorage.setItem(
          "userData",
          `{"username": "${username}", "token": "${data.token}"}`
        );
        navigate("/quiz");
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchToken();
  };

  return (
    <div className="login-container">
      <div className="card-container">
        <h2>Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>

        <label>Username</label>
        <input
          className="input-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johndoe"
        />
        <div className="button-container">
          <button className="login-button" type="submit">
            Login
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
