import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  Stack,
} from "react-bootstrap";
import { API_URL } from "../utils/config";
import { useNavigate, Link } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("client");

  const handleUserType = (type) => {
    setUserType(type);
  };

  const validerFormulaire = async (event) => {
    event.preventDefault();
    // Vérifier la validité du formulaire
    const form = event.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
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
      // Afficher l'alerte pour une inscription réussie
      window.alert("Inscription réussie !");
      navigate("/");

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
        setError(
          "Une erreur s'est produite lors de la récupération des professions."
        );
        console.error(error);
      }
    };

    fetchProfessions();
  }, []);

  return (
    <div>
      <div className="bg-dark text-white">{/* Your ScreenTwo content */}</div>
      <div className="allcontainer">
        <row>
          <div className="containerbb">
            <div className="h1">
              <h1 style={{ color: "#319795" }}>Formulaire d'inscription</h1>
            </div>
            <form id="inscription-form" onSubmit={validerFormulaire}>
              <div className="form-group">
                <label htmlFor="nom">Nom :</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  placeholder="Saisissez votre nom ici"
                  required // Champ obligatoire
                />
              </div>

              <div className="form-group">
                <label htmlFor="adresse">Adresse :</label>
                <input
                  type="text"
                  id="adresse"
                  name="adresse"
                  placeholder="Saisissez votre adresse ici"
                  required // Champ obligatoire
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email :</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Saisissez votre email ici"
                  required // Champ obligatoire
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe :</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Saisissez votre mot de passe ici"
                  required // Champ obligatoire
                />
              </div>

              <div className="form-group">
                <label htmlFor="picture">Sélectionner une photo :</label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  accept="image/*"
                  required // Champ obligatoire
                  title="Sélectionner une photo"
                />
              </div>
              <div className="form-group">
                <label>Type d'utilisateur :</label>
                <div className="checkbox-group d-flex flex-row">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="client"
                      name="client"
                      onClick={() => handleUserType("client")}
                      checked={userType === "client"}
                    />
                    <label className="form-check-label" htmlFor="client">
                      Client
                    </label>
                  </div>
                  <div className="form-check" style={{ marginLeft: "10px" }}>
                    <input
                      className="form-check-input"
                      title="Cochez cette case si vous êtes un professionnel"
                      type="checkbox"
                      id="profesional"
                      name="profesional"
                      onClick={() => handleUserType("profesional")}
                      checked={userType === "profesional"}
                    />
                    <label className="form-check-label" htmlFor="profesional">
                      Professionnel
                    </label>
                  </div>
                </div>
              </div>

              {userType === "profesional" && (
                <div id="profesional-fields">
                  <div className="form-group">
                    <label htmlFor="type-service">Type de profession :</label>
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

              <input
                style={{
                  backgroundColor: "#319795",
                  padding: "10px 20px",
                  border: "4px solid white",
                  boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.1)",
                  color: "000000",
                  textDecoration: "none",
                  borderRadius: "10px",
                  transition: "background-color 0.3s ease",
                }}
                type="submit"
                value="S'inscrire"
              />
              <p className="text-center mt-3">
                Déjà inscrit ?
                <Link to="/Login" style={{ color: "#319795" }}>
                  Connectez-vous ici
                </Link>
              </p>
            </form>
          </div>
          <style>{`
        @import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");

        

        .allcontainer {
         background: #000000; /* Couleur de l'arrière-plan en noir */
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          font-family: "Fira Sans", sans-serif;
        }
         

        .containerbb {
          max-width: 500px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h1 {
          text-align: center;
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
          margin-right: 600px;
        }

         
      `}</style>
        </row>
      </div>
    </div>
  );
}

export default Signup;
