import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  Stack,
} from "react-bootstrap";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { FaEye, FaUserPlus } from "react-icons/fa";
import GeolocationMap from "./GeolocationMap";

const Professions = () => {
  const userId = sessionStorage.getItem("userId");
  const email = sessionStorage.getItem("email");
  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dateBegin, setDateBegin] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [description, setDescription] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [location, setLocation] = useState([0, 0]);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [dateBeginValid, setDateBeginValid] = useState(true);
  const [dateFinishValid, setDateFinishValid] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Tous"); // État du filtre actif

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const response = await axios.get(`${API_URL}/getAllProfessions`);
        setProfessions(response.data);
      } catch (error) {
        console.error("Error fetching professions:", error);
      }
    };

    fetchProfessions();
  }, []);

  const handleDemande = async () => {
    // Vérifiez la validité de chaque champ
    const isDescriptionValid = !!description;
    const isDateBeginValid = !!dateBegin;
    const isDateFinishValid = !!dateFinish;
    const isLatitudeValid = location[0] !== 0;
    const isLongitudeValid = location[1] !== 0;

    // Mettez à jour l'état de chaque champ
    setDescriptionValid(isDescriptionValid);
    setDateBeginValid(isDateBeginValid);
    setDateFinishValid(isDateFinishValid);

    if (
      !isDescriptionValid ||
      !isDateBeginValid ||
      !isDateFinishValid ||
      !isLatitudeValid ||
      !isLongitudeValid
    ) {
      console.log("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (selectedProfession && selectedProfessional) {
      try {
        const formData = {
          userId: userId,
          professionalId: selectedProfessional._id,
          subject: `demande: ${selectedProfession.name} - ${email}`,
          description: description,
          dateBegin: dateBegin,
          dateFinish: dateFinish,
          longitude: location[1],
          latitude: location[0],
        };

        const response = await axios.post(
          `${API_URL}/requestproject`,
          formData
        );
        console.log("Project request sent successfully:", response.data);
        setShowModal(false);
      } catch (error) {
        console.error("Error sending project request:", error);
      }
    } else {
      console.log(
        "Please select a profession and a professional to send the request."
      );
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <Header />
      <hr></hr>
      <hr></hr>
      <hr></hr>
      <hr></hr>

      <h1>Liste des métiers</h1>
      <div>
        <Button
          variant={activeFilter === "Tous" ? "primary" : "outline-primary"}
          onClick={() => handleFilterClick("Tous")}
        >
          Tous
        </Button>{" "}
        {professions.map((profession) => (
          <Button
            key={profession.name}
            variant={
              activeFilter === profession.name ? "primary" : "outline-primary"
            }
            onClick={() => handleFilterClick(profession.name)}
          >
            {profession.name}
          </Button>
        ))}
      </div>
      <hr></hr>
      <div>
        {professions.length > 0 ? (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Métiers</th>
                <th>Professionnels</th>
              </tr>
            </thead>
            <tbody>
              {professions
                .filter((profession) => {
                  if (activeFilter === "Tous") {
                    return true;
                  }
                  return profession.name === activeFilter;
                })
                .map((profession) => (
                  <tr key={profession._id}>
                    <td>{profession.name}</td>
                    <td>
                      <ul className="list-group">
                        {profession.professionals.map((professional) => (
                          <li
                            key={professional._id}
                            className="list-group-item d-flex justify-content-between"
                          >
                            {professional.email}
                            {userId ? (
                              userId === professional._id ? null : (
                                <>
                                  <button
                                    style={{
                                      backgroundColor: "#1877F2",
                                      padding: "10px 20px",
                                      border: "2px solid white",
                                      color: "#ffffff",
                                      borderRadius: "8px",
                                      boxShadow:
                                        "4px 4px 6px rgba(8, 0, 0, 0.2)",
                                      textDecoration: "none",
                                      transition: "background-color 0.3s ease",
                                    }}
                                    className="icon-button"
                                    onClick={() =>
                                      navigate(
                                        `/ProfilProfessional/${professional._id}`
                                      )
                                    }
                                  >
                                    <FaEye />
                                    Consulter
                                  </button>
                                  <button
                                    style={{
                                      backgroundColor: "#1877F2",
                                      padding: "10px 20px",
                                      border: "2px solid white",
                                      color: "#ffffff",
                                      borderRadius: "8px",
                                      boxShadow:
                                        "4px 4px 6px rgba(8, 0, 0, 0.2)",
                                      textDecoration: "none",
                                      transition: "background-color 0.3s ease",
                                    }}
                                    className="icon-button"
                                    onClick={() => {
                                      setSelectedProfession(profession);
                                      setSelectedProfessional(professional);
                                      setShowModal(true);
                                    }}
                                  >
                                    <FaUserPlus />
                                    Demander
                                  </button>
                                </>
                              )
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
        <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Demander un prestataire</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form>
                  <Stack gap={2}>
                    <Form.Group className="mb-3" controlId="profession">
                      <Form.Label>Métier</Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          selectedProfession ? selectedProfession.name : ""
                        }
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="nomPrestataire">
                      <FloatingLabel controlId="1" label="Nom du prestataire">
                        <Form.Control
                          type="text"
                          value={
                            selectedProfessional ? selectedProfessional._id : ""
                          }
                          readOnly
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="description">
                      <FloatingLabel controlId="1" label="Description">
                        <Form.Control
                          placeholder="Saisissez votre description ici"
                          as="textarea"
                          rows={4}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </FloatingLabel>
                      {!descriptionValid && (
                        <div className="text-danger">
                          Veuillez remplir ce champ.
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="dateDebut">
                      <FloatingLabel controlId="1" label="Date de début">
                        <Form.Control
                          type="date"
                          value={dateBegin}
                          onChange={(e) => setDateBegin(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </FloatingLabel>
                      {!dateBeginValid && (
                        <div className="text-danger">
                          Veuillez sélectionner la date de début.
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="dateFin">
                      <FloatingLabel controlId="1" label="Date de fin">
                        <Form.Control
                          type="date"
                          value={dateFinish}
                          onChange={(e) => setDateFinish(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </FloatingLabel>
                      {!dateFinishValid && (
                        <div className="text-danger">
                          Veuillez sélectionner la date de fin.
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="longitude">
                      <FloatingLabel controlId="1" label="Longitude">
                        <Form.Control
                          type="number"
                          readOnly
                          value={location[0]}
                          required
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-1" controlId="latitude">
                      <FloatingLabel controlId="1" label="Latitude">
                        <Form.Control
                          type="number"
                          readOnly
                          value={location[1]}
                          required
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Stack>
                </Form>
              </Col>
              <Col md="auto">
                <GeolocationMap setPosition={setLocation} />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{
                backgroundColor: "red",
                padding: "10px 20px",
                border: "2px solid white",
                color: "#ffffff",
                borderRadius: "8px",
                boxShadow: "4px 4px 6px rgba(8, 0, 0, 0.2)",
                textDecoration: "none",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => setShowModal(false)}
            >
              Annuler
            </Button>
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
              onClick={handleDemande}
            >
              Envoyer
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Professions;
