import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../utils/config";
function Signup() {
  const [userType, setUserType] = useState("client");

  const handleUserType = (type) => {
    setUserType(type);
  };

  const validerFormulaire = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", event.target.elements.nom.value);
      formData.append("address", event.target.elements.adresse.value);
      formData.append("email", event.target.elements.email.value);
      formData.append("password", event.target.elements.password.value);
      formData.append("picture", event.target.elements.picture.files[0]);
      if (userType === "profesional") {
        const selectedProfession = event.target.elements["type-service"].value;
        formData.append("profession", selectedProfession);
      }

      const response = await axios.post(
        "http://localhost:3000/addusers",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data); // Message de succès du serveur

      // Réinitialiser le formulaire
      //event.target.reset();
    } catch (error) {
      console.error(error);
      // Gérer les erreurs de requête
    }
  };

  const [professions, setProfessions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await axios.get(`${API_URL}/getAllProfessions`);
        setProfessions(response.data);
      } catch (error) {
        setError("Error occurred while fetching professions.");
        console.error(error);
      }
    };

    fetchProfessions();
  }, []);

  return (
    <div className="container">
      <h1>Formulaire d'inscription</h1>

      <form id="inscription-form" onSubmit={validerFormulaire}>
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" name="nom" />
        </div>

        <div className="form-group">
          <label htmlFor="adresse">Adresse :</label>
          <input type="text" id="adresse" name="adresse" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" name="password" />
        </div>

        <div className="form-group">
          <label htmlFor="picture">Photo :</label>
          <input type="file" id="picture" name="picture" accept="image/*" />
        </div>
        <div className="form-group">
          <label>Type d'utilisateur :</label>
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="client"
              name="client"
              onClick={() => handleUserType("client")}
              checked={userType === "client"}
            />
            <label htmlFor="client">Client</label>
            <input
              type="checkbox"
              id="profesional"
              name="profesional"
              onClick={() => handleUserType("profesional")}
              checked={userType === "profesional"}
            />
            <label htmlFor="profesional">professionel</label>
          </div>
        </div>

        {userType === "profesional" && (
          <div id="profesional-fields">
            <div className="form-group">
              <label htmlFor="type-service">Professions:</label>
              <select id="type-service" name="type-service">
                {professions.map((profession) => (
                  <option key={profession._id} value={profession._id}>
                    {profession.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <input className="submit-btn" type="submit" value="S'inscrire" />
      </form>

      <style>{`
        @import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

        * {
          box-sizing: border-box;
        }

        body {
          background: #f6f8fa;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-family: "Fira Sans", sans-serif;
        }

        .container {
          max-width: 500px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
          color: #007bff;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-weight: bold;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        select {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .checkbox-group {
          display: flex;
        }

        .checkbox-group input[type="checkbox"] {
          margin-right: 10px;
        }

        .submit-btn {
          background-color: #007bff;
          color: #ffffff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default Signup;
