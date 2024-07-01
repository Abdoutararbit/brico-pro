import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import { Dropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignInAlt,
  faUserPlus,
  faSearch,
  faComment,
} from "@fortawesome/free-solid-svg-icons"; // Import the icons
import logo from "../assets/images/logo.png";
const logoContainerStyle = {
  maxWidth: "100px", // Ajustez la largeur maximale en fonction de vos besoins
  display: "flex",
  alignItems: "center",
  fontSize: "1.5rem",
  cursor: "pointer",
  padding: "2px",
  borderRadius: "12%",
};

const Header = () => {
  const userId = sessionStorage.getItem("userId");
  const role = sessionStorage.getItem("role");
  const isAdmin = sessionStorage.getItem("isAdmin");
  console.log(role);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();
  const isLoggedIn = !!userId; // Check if the user is logged in
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data on logout
    // window.location.reload(); // Refresh the page after logout to update the header
    navigate("/");
  };

  useEffect(() => {
    // Fetch user data when the component mounts if the user is logged in
    if (isLoggedIn) {
      // Implement your API endpoint to fetch user data by userId
      axios
        .get(`${API_URL}/profilusers/${userId}`)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Handle error, e.g., show an error message or redirect to sign-in page
        });
    }
  }, [isLoggedIn, userId]);

  const handleAvatarClick = () => {
    if (role === "professional") {
      navigate(`/ProfilProfessional/${userId}`);
    } else if (role === "user") {
      navigate(`/ProfilUser/${userId}`);
    } else if (role === "admin") {
      navigate(`/ProfilAdmin/${userId}`);
    } else {
      console.error("Invalid role");
    }
  };

  return (
    <header className="bg-dark text-white p-1 header-fixed">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/Home" style={logoContainerStyle}>
          <img src={logo} alt="Your Logo" className="img-fluid" />
        </Link>

        <div className="links d-flex align-items-center">
          {isLoggedIn ? (
            <>
              {console.log("role", isAdmin)}
              {isAdmin === "true" && ( // Condition pour afficher l'icône uniquement si l'utilisateur est un administrateur
                <Link
                  to={`/ProfilAdmin/${userId}`}
                  className="text-white me-4"
                  style={{ textDecoration: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faUser} // Remplacez par l'icône de votre choix
                    style={{
                      fontSize: "1.5rem",
                      cursor: "pointer",
                      border: "2px solid white",
                      padding: "4px",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
              )}
              {/* Liens pour les utilisateurs connectés */}{" "}
              <Link
                to="/Home"
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                <h5>Accueil</h5>
              </Link>
              <Link
                to="/Professions"
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                <h5>Professions</h5>
              </Link>
              <Link
                to="/Searchengine" // Remplacez par la route de recherche réelle
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "1.5rem" }}
                />
              </Link>
              <Link
                to={
                  role === "professional"
                    ? "/Discussionprofessional"
                    : "/Discussion"
                }
                className="messenger-icon"
              >
                <FontAwesomeIcon
                  icon={faComment}
                  style={{ fontSize: "1.5rem" }}
                />
              </Link>
              {userData && (
                <div className="d-flex align-items-center user-avatar ms-3">
                  <img
                    src={`${API_URL}/${userData.picture}`}
                    alt="User Avatar"
                    className="rounded-circle"
                    width="50vm"
                    height="50vh"
                    onClick={handleAvatarClick}
                    style={{ cursor: "pointer", border: "1px solid white" }}
                  />
                  <div className="dropdown ms-2">
                    {!isLoggedIn ? (
                      <Button
                        style={{
                          backgroundColor: "#1877F2",
                          padding: "10px 20px",
                          border: "2px solid white",
                          color: "#ffffff",
                          borderRadius: "8px",
                          boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                          textDecoration: "none",
                          transition: "background-color 0.3s ease",
                        }}
                        onClick={() => navigate("/")}
                      >
                        Se connecter
                      </Button>
                    ) : (
                      <Dropdown>
                        <Dropdown.Toggle
                          as={Button}
                          variant="success"
                          style={{
                            backgroundColor: "#1877F2",
                            padding: "2px 10px",
                            border: "2px solid white",
                            color: "#ffffff",
                            borderRadius: "8px",
                            boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                            textDecoration: "none",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <FontAwesomeIcon icon={faUser} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={handleLogout}
                            style={{
                              backgroundColor: "red",
                              border: "2px solid white",
                              color: "#ffffff",
                              borderRadius: "8px",
                              boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                              textDecoration: "none",
                              transition: "background-color 0.3s ease",
                            }}
                          >
                            Se déconnecter
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Liens pour les utilisateurs non connectés */}
              <Link
                to="/Home"
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                <h5>Accueil</h5>
              </Link>
              <Link
                to="/Professions"
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                <h5>Professions</h5>
              </Link>
              <Link
                to="/Searchengine" // Remplacez par la route de recherche réelle
                className="text-white me-4"
                style={{ textDecoration: "none" }}
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "1.8rem" }}
                />
              </Link>
              <Link
                className="text-white me-2"
                to="/Signup"
                style={{
                  backgroundColor: "#1877F2",
                  padding: "6px 16px",
                  border: "2px solid white",
                  color: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.1)",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease",
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} /> S'inscrire
              </Link>
              <Link
                to="/Login"
                style={{
                  backgroundColor: "#1877F2",
                  padding: "6px 16px",
                  border: "2px solid white",
                  color: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease",
                }}
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                Se connecter
              </Link>
            </>
          )}
        </div>
        <style>
          {`
            /* Ajoutez ces styles dans votre fichier CSS */
            .messenger-icon {
              background-color: #1877F2;
              padding: 10px;
              border: 2px solid white;
              color: #ffffff;
              border-radius: 50%;
              box-shadow: 4px 4px 6px rgba(8, 0, 0, 0.2);
              text-decoration: none;
              transition: background-color 0.3s ease;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
            .header-fixed {
  position: fixed;
  top: 0%;
  left: 0;
  right: 0;
  z-index: 1000; /* Assurez-vous que le z-index est supérieur à celui des autres éléments de la page si vous souhaitez qu'il soit au-dessus. */
}
          `}
        </style>
      </div>
    </header>
  );
};

export default Header;
