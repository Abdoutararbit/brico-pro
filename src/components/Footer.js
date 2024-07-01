import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faSearch,
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-solid-svg-icons"; // Utilisation d'icônes solides pour Accueil, Professions, Recherche
import {
  faFacebookF as fabFacebookF,
  faTwitter as fabTwitter,
  faInstagram as fabInstagram,
} from "@fortawesome/free-brands-svg-icons"; // Utilisation d'icônes de marques pour les réseaux sociaux
import logo from "../assets/images/logo.png"; // Assurez-vous d'importer votre logo ici

const Footer = () => {
  const iconStyle = {
    marginRight: "10px",
    fontSize: "1.5em",
    transition: "transform 0.3s ease",
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "white",
    fontSize: "0.9em",
    margin: "5px 0",
    transition: "color 0.3s ease",
  };

  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <img
              src={logo}
              alt="Your Logo"
              className="img-fluid"
              style={{ maxWidth: "100px" }}
            />
          </div>
          <div className="col-md-4">
            <h4 className="mb-3">Liens utiles</h4>
            <ul className="list-unstyled">
              <li>
                <a href="/" style={linkStyle}>
                  <FontAwesomeIcon icon={faHome} style={iconStyle} />
                  Accueil
                </a>
              </li>
              <li>
                <a href="/Professions" style={linkStyle}>
                  <FontAwesomeIcon icon={faBriefcase} style={iconStyle} />
                  Professions
                </a>
              </li>
              <li>
                <a href="/Searchengine" style={linkStyle}>
                  <FontAwesomeIcon icon={faSearch} style={iconStyle} />
                  Recherche
                </a>{" "}
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="mb-3">Suivez-nous</h4>
            <ul className="list-unstyled d-flex justify-content-center justify-content-md-start">
              <li className="mr-3">
                <a
                  href="https://web.facebook.com/?locale=fr_FR&_rdc=1&_rdr"
                  className="text-white d-flex align-items-center"
                  style={{ ...linkStyle, textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("svg").style.transform =
                      "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("svg").style.transform =
                      "scale(1)";
                  }}
                >
                  <FontAwesomeIcon icon={fabFacebookF} style={iconStyle} />
                  <span style={{ marginLeft: "5px" }}>Facebook</span>
                </a>
              </li>
              <li className="mr-3">
                <a
                  href="https://x.com/"
                  className="text-white d-flex align-items-center"
                  style={{ ...linkStyle, textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("svg").style.transform =
                      "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("svg").style.transform =
                      "scale(1)";
                  }}
                >
                  <FontAwesomeIcon icon={fabTwitter} style={iconStyle} />
                  <span style={{ marginLeft: "5px" }}>Twitter</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  className="text-white d-flex align-items-center"
                  style={{ ...linkStyle, textDecoration: "none" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.querySelector("svg").style.transform =
                      "scale(1.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.querySelector("svg").style.transform =
                      "scale(1)";
                  }}
                >
                  <FontAwesomeIcon icon={fabInstagram} style={iconStyle} />
                  <span style={{ marginLeft: "5px" }}>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
