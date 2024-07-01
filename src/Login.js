import React, { useState } from "react";
import "./bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
        setError("Rôle invalide");
      }
      // Stocker les données de session dans le stockage local
      sessionStorage.setItem("userId", user._id);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("isAdmin", user.isAdmin ?? false);
    } catch (error) {
      // Gérer l'erreur de connexion
      if (error.response && error.response.status === 401) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
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
        <h2 style={{ color: "#1877F2 " }}>Connectez-vous à votre compte</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Adresse e-mail</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Entrez votre adresse e-mail"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="d-grid">
            <button
              type="submit"
              style={{
                backgroundColor: "#1877F2 ",
                padding: "10px 20px",
                border: "4px solid white",
                boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.1)", // Ajoute une ombre douce pour un effet 3D subtil
                color: "#ffffff",
                textDecoration: "none",
                borderRadius: "10px",
                transition: "background-color 0.3s ease",
              }}
            >
              Se connecter
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}

          <p>
            Si vous n'avez pas encore de compte, vous pouvez en créer un :
            <Link to="/Signup" style={{ color: "#1877F2 " }}>
              S'inscrire
            </Link>
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
          width: 500px;
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
          color: #blue;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Login;
