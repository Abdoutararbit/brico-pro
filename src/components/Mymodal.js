import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  FloatingLabel,
  Stack,
} from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/config";
import GeolocationMap from "../screens/GeolocationMap";

const MyModal = ({ showModal, setShowModal, selectedProfessional }) => {
  const userId = sessionStorage.getItem("userId");
  const email = sessionStorage.getItem("email");

  // Add your state variables here (dateBegin, dateFinish, userId, etc.)
  const [dateBegin, setDateBegin] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [description, setdescription] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [location, setLocation] = useState([0, 0]);

  // Add other state variables as needed
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [dateBeginValid, setDateBeginValid] = useState(true);
  const [dateFinishValid, setDateFinishValid] = useState(true);
  const [latitudeValid, setLatitudeValid] = useState(true);
  const [longitudeValid, setLongitudeValid] = useState(true);

  const handleDemande = async () => {
    // Vérifier si les champs requis sont vides
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
    setLatitudeValid(isLatitudeValid);
    setLongitudeValid(isLongitudeValid);

    // Si un champ n'est pas valide, arrêtez ici
    if (
      !isDescriptionValid ||
      !isDateBeginValid ||
      !isDateFinishValid ||
      !isLatitudeValid ||
      !isLongitudeValid
    ) {
      return;
    }

    // Handle the Demander button click here
    if (selectedProfessional) {
      try {
        const formData = {
          userId, // Add the user's ID here
          professionalId: selectedProfessional._id,
          subject: `Demande: ${selectedProfessional.profession.name} - ${email}`,
          description,
          dateBegin, // Use the state value for dateBegin
          dateFinish, // Use the state value for dateFinish
          longitude: location[1], // Add longitude value
          latitude: location[0], // Add latitude value
        };
        console.log("data", formData);
        const response = await axios.post(
          `${API_URL}/requestproject`,
          formData
        );
        console.log("Project request sent successfully:", response.data);
        // Optionally, you can show a success message to the user or redirect to another page
        setShowModal(false);
      } catch (error) {
        console.error("Error sending project request:", error);
        alert("veuillez vous authentifier");
        // Optionally, you can show an error message to the user
      }
    } else {
      console.log(
        "Please select a profession and a professional to send the request."
      );
    }
  };

  return (
    <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Demander un prestataire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form>
              <Stack gap={2}>
                <Form.Group className="mb-1" controlId="profession">
                  <FloatingLabel controlId="1" label="Metier">
                    <Form.Control
                      placeholder=""
                      type="text"
                      value={
                        selectedProfessional
                          ? selectedProfessional.profession.name
                          : ""
                      }
                      readOnly
                    />
                  </FloatingLabel>
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
                      onChange={(e) => setdescription(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                  {/* Affichez le message d'erreur s'il y a un problème avec la description */}
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
                      min={new Date().toISOString().split("T")[0]} // Définir la date minimale à aujourd'hui
                      required
                    />
                  </FloatingLabel>
                  {/* Affichez le message d'erreur s'il y a un problème avec la description */}
                  {!dateBeginValid && (
                    <div className="text-danger">
                      selectioner la date Debut.
                    </div>
                  )}
                </Form.Group>
                <Form.Group className="mb-1" controlId="dateFin">
                  <FloatingLabel controlId="1" label="Date de fin">
                    <Form.Control
                      type="date"
                      value={dateFinish}
                      onChange={(e) => setDateFinish(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Définir la date minimale à aujourd'hui
                      required
                    />
                  </FloatingLabel>
                  {/* Affichez le message d'erreur s'il y a un problème avec la description */}
                  {!dateFinishValid && (
                    <div className="text-danger">selectioner la date fin.</div>
                  )}
                </Form.Group>
                <Form.Group className="mb-1" controlId="longitude">
                  <FloatingLabel controlId="1" label="Longitude">
                    <Form.Control
                      type="number"
                      step="0.000001"
                      readOnly
                      value={location[0]}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-1" controlId="latitude">
                  <FloatingLabel controlId="1" label="latitude">
                    <Form.Control
                      type="number"
                      step="0.000001"
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
  );
};

export default MyModal;
