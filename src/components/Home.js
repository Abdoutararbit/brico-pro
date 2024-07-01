import React from "react";
import { Link } from "react-router-dom";
import Carousel from "./carousel";
import Team from "./Team";
import image1 from "../assets/images/image1.jpg";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const handleHomeClick = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="home-container">
      <div>
        <Header />
        <hr></hr>
        <hr></hr>

        <Carousel />
      </div>
      <hr></hr>
      <div className="image-container" style={{ position: "relative" }}>
        <img src={image1} alt="" width="100%" height="100%" />
        <Team />
        <div className="base_header text-center">
          <div>
            <h4
              className="welcome-text"
              style={{
                position: "absolute",
                top: "74.5%",
                left: "50%",
                height: "21%",
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                color: "#000000",
                zIndex: 1,
                fontSize: "1.2rem", // Ajuster la taille de la police ici
                lineHeight: "1.75",
                textAlign: "center",
                backgroundColor: "rgba(250, 250, 250, 0.3)", // Ajouter un fond semi-transparent
                padding: "20px",
                borderRadius: "20px", // Ajouter un border-radius
              }}
            >
              <span> Bienvenue chez Brico-Pro</span>
              <hr></hr>
              "Brico-Pro : Votre solution personnalisée pour le bricolage et la
              rénovation. Accédez à une plateforme regroupant des prestataires
              qualifiés pour vos projets, des réparations simples aux
              rénovations complètes. Explorez les profils d'experts, choisissez
              celui qui correspond à vos besoins et concrétisez vos projets en
              toute confiance avec Brico-Pro."
            </h4>
          </div>
        </div>

        <Footer />

        {/* The Footer, AboutUs, ContactUs, Login, Register, PrivacyPolicy, TermsOfService, and CookieConsent components */}
        {/* The <script> and <div> elements */}
      </div>
    </div>
  );
};

export default Home;
