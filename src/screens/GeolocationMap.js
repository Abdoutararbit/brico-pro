import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import pngegg from "../assets/images/pngegg.png";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: pngegg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function GeolocationMap({ setPosition }) {
  const [userLocation, setUserLocation] = useState([
    36.5890591269992, 3.765712338639898,
  ]);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setUserLocation([lat, lng]);
    setPosition([lat, lng]);
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        }
      );
    } else {
      console.error(
        "La géolocalisation n'est pas prise en charge par ce navigateur."
      );
    }
  };

  useEffect(() => {
    getUserLocation();
  }, [setPosition]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        handleMapClick(e);
      },
    });
    return null;
  };

  return (
    <div style={{ textAlign: "center" }}>
      <MapContainer
        center={userLocation}
        zoom={13}
        style={{ height: "70vh", width: "50vw" }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapClickHandler />
        <Marker position={userLocation} icon={customIcon}>
          <div style={{ textAlign: "center" }}>
            <Popup>
              <p className="fs-5 fw-bold">Votre position</p>
              <p>Latitude: {userLocation[0]}</p>
              <p>Longitude: {userLocation[1]}</p>
            </Popup>
          </div>
        </Marker>
      </MapContainer>
      <button onClick={getUserLocation}>Obtenir ma position</button>
    </div>
  );
}

export default GeolocationMap;
