// MyModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/config";

const MyModal = ({
  showModal,
  setShowModal,

  selectedProfessional,
}) => {
  const userId = sessionStorage.getItem("userId");
  // Add your state variables here (dateBegin, dateFinish, userId, etc.)
  const [dateBegin, setDateBegin] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  // Add other state variables as needed

  const handleDemande = async () => {
    // Handle the Demander button click here
    console.log("demade");
    if (selectedProfessional) {
      try {
        const formData = {
          userId: userId, // Add the user's ID here
          professionalId: selectedProfessional._id,
          subject: `Requested: ${selectedProfessional.profession.name} - ${selectedProfessional.email}`,
          description: "",
          dateBegin: dateBegin, // Use the state value for dateBegin
          dateFinish: dateFinish, // Use the state value for dateFinish
        };
        console.log("ok");
        const response = await axios.post(
          `${API_URL}/requestproject`,
          formData
        );
        console.log("Project request sent successfully:", response.data);
        // Optionally, you can show a success message to the user or redirect to another page
        setShowModal(false);
      } catch (error) {
        console.error("Error sending project request:", error);
        // Optionally, you can show an error message to the user
      }
    } else {
      console.log(
        "Please select a profession and a professional to send the request."
      );
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Demander un prestataire</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="profession">
            <Form.Label>Profession</Form.Label>
            <Form.Control
              type="text"
              value={
                selectedProfessional ? selectedProfessional.profession.name : ""
              }
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nomPrestataire">
            <Form.Label>Nom du prestataire</Form.Label>
            <Form.Control
              type="text"
              value={selectedProfessional ? selectedProfessional._id : ""}
              readOnly
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateDebut">
            <Form.Label>Date de début</Form.Label>
            <Form.Control
              type="date"
              value={dateBegin} // Use the state value for dateBegin
              onChange={(e) => setDateBegin(e.target.value)} // Update state on change
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateFin">
            <Form.Label>Date de fin</Form.Label>
            <Form.Control
              type="date"
              value={dateFinish} // Use the state value for dateFinish
              onChange={(e) => setDateFinish(e.target.value)} // Update state on change
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Annuler
        </Button>
        <Button variant="primary" onClick={handleDemande}>
          Envoyer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
