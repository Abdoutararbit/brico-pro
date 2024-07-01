import React from "react";
import mapIconImage from "../assets/images/pngegg.png";
import styled from "styled-components"; // Importer le module de styles

// Créer un composant stylisé pour le conteneur de la carte
const MapContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MapIcon = ({ latitude, longitude }) => {
  const handleClick = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank"); // Ouvrir le lien dans un nouvel onglet
  };

  return (
    <MapContainer>
      <h4 style={{ marginBottom: "10px", textAlign: "center" }}>
        Cliquez sur l'icon pour trouver la position que vous voulez
      </h4>
      <div
        style={{
          position: "absolute", // Utiliser une position absolue
          top: "170%", // Centrer verticalement
          left: "50%", // Centrer horizontalement
          transform: "translate(-50%, -50%)", // Ajuster pour centrer exactement
          width: "60px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%", // Donner une forme circulaire
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.3)", // Ajouter une ombre légère
          cursor: "pointer",
          backgroundColor: "#1877F2", // Couleur de fond
        }}
        onClick={handleClick}
      >
        <img
          src={mapIconImage} // Utilisez la variable mapIconImage comme chemin d'accès à l'image
          alt="Icône de carte"
          style={{
            width: "80%", // Ajuster la taille de l'image
            height: "80%", // Ajuster la taille de l'image
          }}
        />
      </div>
    </MapContainer>
  );
};

export default MapIcon;
