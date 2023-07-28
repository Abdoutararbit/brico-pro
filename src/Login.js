import React, { useState } from "react";
import "./bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:3000/signIn", {
        email: email,
        password: password,
      });

      const { user, role, token } = response.data;

      if (user.isAdmin) {
        navigate(`/ProfilAdmin/${user._id}`);
      } else if (role === "professional") {
        navigate(`/ProfilProfessional/${user._id}`);
      } else if (role === "user") {
        navigate(`/ProfilUser/${user._id}`);
      } else {
        setError("Invalid role");
      }
      // Store session data in local storage
      sessionStorage.setItem("userId", user._id);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
    } catch (error) {
      // Handle sign-in error
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <div className="auth-inner">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
          <p className="forgot-password text-right">
            Sign up: <a href="Signup">Sign up</a>
          </p>
        </form>
      </div>
      <style>{`
        /* Votre style CSS ici... */
        @import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

        * {
          box-sizing: border-box;
        }

        body {
          background: #000000; /* Couleur de l'arrière-plan en noir */
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-family: "Fira Sans", sans-serif;
        }

        .container {
          width: 400px;
        }

        .auth-inner {
          background: #fff;
          box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
          padding: 40px;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .auth-inner h3 {
          text-align: center;
          margin: 0;
          line-height: 1;
          margin-bottom: 20px;
          color: #0366d6;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          padding: 8px 10px;
          font-size: 16px;
          border: 1px solid #d1d5da;
          border-radius: 6px;
          outline: none;
          transition: border-color 0.3s;
        }

        .form-group input:focus {
          border-color: #0366d6;
        }

        .form-group.checkbox-group {
          display: flex;
          align-items: center;
        }

        .form-group.checkbox-group .form-check-input {
          margin-right: 8px;
        }

        .form-group.checkbox-group .form-check-label {
          margin-bottom: 0;
        }

        .btn {
          display: block;
          width: 100%;
          padding: 12px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          color: #fff;
          background-color: #0366d6;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .btn:hover {
          background-color: #0354c7;
        }

        .forgot-password {
          text-align: right;
          margin-top: 10px;
        }

        .forgot-password a {
          font-size: 14px;
          color: #0366d6;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Login;
