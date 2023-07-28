import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/config";
import { Modal, Button, Form } from "react-bootstrap";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const Professions = () => {
  const userId = sessionStorage.getItem("userId");
  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState(null);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // State for dateBegin and dateFinish
  const [dateBegin, setDateBegin] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch professions from the server
    const fetchProfessions = async () => {
      try {
        const response = await axios.get(`${API_URL}/getAllProfessions`);
        console.log(response.data);
        setProfessions(response.data);
      } catch (error) {
        console.error("Error fetching professions:", error);
      }
    };

    // Call the function to fetch professions when the component mounts
    fetchProfessions();
  }, []);

  const handleDemande = async () => {
    // Handle the Demander button click here
    console.log("demade");
    if (selectedProfession && selectedProfessional) {
      try {
        const formData = {
          userId: userId, // Add the user's ID here
          professionalId: selectedProfessional._id,
          subject: `Requested: ${selectedProfession.name} - ${selectedProfessional.email}`,
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
    <div>
      <div>
        <Header />
        {/* Your ScreenTwo content */}
      </div>
      <h1>Profession List</h1>
      {professions.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>professions</th>
              <th>professionals</th>
            </tr>
          </thead>
          <tbody>
            {professions.map((profession) => (
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
                        {
                          userId ? (
                            // If userId exists (user is connected)
                            userId === professional._id ? null : ( // If userId matches the professional._id (user is viewing their own profile)
                              // If userId does not match the professional._id (user is viewing someone else's profile)
                              <>
                                {" "}
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() =>
                                    navigate(
                                      `/ProfilProfessional/${professional._id}`
                                    )
                                  }
                                >
                                  Consulter
                                </button>
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={() => {
                                    setSelectedProfession(profession);
                                    setSelectedProfessional(professional);
                                    setShowModal(true);
                                  }}
                                >
                                  Demander
                                </button>
                              </>
                            )
                          ) : // If userId does not exist (user is not connected)
                          null // Do not show both the buttons "Demander" and "Consulter"
                        }
                        {/*  <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            navigate(`/ProfilProfessional/${professional._id}`);
                          }}
                        >
                          Consulter
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => {
                            setSelectedProfession(profession);
                            setSelectedProfessional(professional);
                            setShowModal(true);
                          }}
                        >
                          Demander
                        </button>*/}
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
                value={selectedProfession ? selectedProfession.name : ""}
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
    </div>
  );
};

export default Professions;
