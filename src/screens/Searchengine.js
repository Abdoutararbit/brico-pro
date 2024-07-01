import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Card } from "flowbite-react";
import { Image } from "react-bootstrap";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer } from "react-bootstrap-drawer";
import image1 from "../assets/images/image1.jpg";
import Footer from "../components/Footer";

const SearchEngine = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (searchInput.trim() === "") {
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_URL}/searchengine?search=${searchInput}`
      );
      setSearchResults(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching users:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${image1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-dark text-white">
        <Header />
      </div>
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <br></br>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="text">
          <h2>Rechercher un métier</h2>
          <div className="input-group my-2 my-lg-2">
            <input
              style={{
                border: "2px solid black",
                color: "#000000",
                boxShadow: "4px 4px 6px rgba(255, 255, 255, 0.8)",
                textDecoration: "none",
                borderRadius: "10px",
                transition: "background-color 0.3s ease",
                fontSize: "1.5rem", // Ajuster la taille de la police ici
                lineHeight: "1",
                backgroundColor: "rgba(255, 255, 255, 0.8)", // Ajouter un fond semi-transparent
              }}
              className="form-control"
              type="search"
              placeholder="Rechercher un métier"
              aria-label="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="input-group-append">
              <button
                style={{
                  border: "2px solid black",
                  color: "#ffffff",
                  boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                  textDecoration: "none",
                  transition: "background-color 0.3s ease",
                  fontSize: "1.5rem", // Ajuster la taille de la police ici
                  lineHeight: "1",
                  textAlign: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.2)", // Ajouter un fond semi-transparent
                  borderRadius: "10px",
                }}
                type="button"
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <div className="mt-4 d-flex flex-wrap justify-content-center">
            {searchResults?.map((result) => (
              <div
                key={result._id}
                style={{
                  width: "330vm",
                  margin: "0 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  fontSize: "1.5rem", // Ajuster la taille de la police ici
                  lineHeight: "2",
                }}
              >
                <div key={result._id}>
                  <Card
                    renderImage={() => (
                      <Image
                        width={"330vm"}
                        height={"200vh"}
                        src={`${API_URL}/${result.picture}`}
                        alt={result.username}
                      />
                    )}
                  >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {result.username}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      {result.profession && (
                        <p>
                          <strong>Profession:</strong> {result.profession.name}
                        </p>
                      )}
                    </p>
                    <Link
                      to={`/ProfilProfessional/${result._id}`}
                      style={{ color: "#319795" }}
                    >
                      Voir le profil
                    </Link>
                  </Card>
                </div>
              </div>
            ))}
            {searchResults?.length === 0 && (
              <div className="text-center">
                <p className="text-danger font-weight-bold">
                  No results found.
                </p>
              </div>
            )}
          </div>

          {!loading ? null : <Spinner animation="border" variant="primary" />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchEngine;
