import React from "react";
import { Icon } from "react-icons-kit";
import {
  linkedin,
  twitter,
  facebook,
  instagram,
} from "react-icons-kit/feather"; // Import des icônes Feather
import yacine from "../assets/images/yacine.jpg";
import IMG from "../assets/images/IMG.jpg";
import { Link } from "react-router-dom";
import { all } from "axios";

const Team = () => {
  const iconStyle = {
    color: "black", // Changer la couleur en noir
  };
  return (
    <div className="steps" id="team">
      <div
        className="container"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",

          transform: "translate(-50%, -75%)",
          cursor: "pointer",
          color: "#000000",
          zIndex: 1,
          fontSize: "1.5rem", // Ajuster la taille de la police ici
          lineHeight: "2",
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Ajouter un fond semi-transparent
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        <div className="base_header text-center">
          <span>
            <strong className="bor_header_left"></strong>
            <h1>NOTRE ÉQUIPE</h1>
            <strong className="bor_header_right"></strong>
          </span>
          <h3>Rencontrer l'équipe</h3>
        </div>
        <div className="d-flex justify-content-around">
          <div className="col-md-4">
            <div className="container text-center team-mates">
              <Link to="/autre-page">
                <img src={IMG} alt="Person 1" />
              </Link>
              <h3>Abdenour Tararbit</h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                }}
              >
                <li className="team-icons">
                  <a href="#">
                    <Icon size={32} icon={linkedin} style={iconStyle} />
                    {/* Utilisation de l'icône de LinkedIn de Feather */}
                  </a>
                  <a href="#">
                    <Icon size={32} icon={twitter} style={iconStyle} />
                    {/* Utilisation de l'icône de Twitter de Feather */}
                  </a>
                  <a href="#">
                    <Icon size={32} icon={facebook} style={iconStyle} />
                    {/* Utilisation de l'icône de Facebook de Feather */}
                  </a>
                  <a href="#">
                    <Icon size={32} icon={instagram} style={iconStyle} />
                    {/* Utilisation de l'icône de Facebook de Feather */}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="container text-center team-mates">
              <Link to="/autre-page">
                <img src={yacine} alt="Person 2" />
              </Link>
              <h3>Yacine Azzoug</h3>

              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                }}
              >
                <li className="team-icons">
                  <a href="#">
                    <Icon size={32} icon={linkedin} style={iconStyle} />
                    {/* Utilisation de l'icône de LinkedIn de Feather */}
                  </a>
                  <a href="#">
                    <Icon size={32} icon={twitter} style={iconStyle} />
                    {/* Utilisation de l'icône de Twitter de Feather */}
                  </a>
                  <a href="#">
                    <Icon size={32} icon={facebook} style={iconStyle} />
                    {/* Utilisation de l'icône de Facebook de Feather */}
                  </a>
                  <a href="#">
                    <Icon size={32} icon={instagram} style={iconStyle} />
                    {/* Utilisation de l'icône de Facebook de Feather */}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
