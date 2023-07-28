import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import { Container, Row, Col, Form, Button, Nav, Table } from "react-bootstrap";
import "../bootstrap/bootstrap-5.0.2-dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ProfilAdmin = () => {
  const [professionName, setProfessionName] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAddProfession, setShowAddProfession] = useState(false);
  const [activeTab, setActiveTab] = useState("profession"); // Default active tab is "profession"
  const navigate = useNavigate();

  const handleProfessionNameChange = (event) => {
    setProfessionName(event.target.value);
  };

  const handleAddProfession = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_URL}/addprofessions`, {
        name: professionName,
      });

      setSuccessMessage("Profession added successfully!");
      fetchProfessions();
      setProfessionName("");
    } catch (error) {
      setError("Error occurred while adding profession.");
      console.error(error);
    }
  };
  const [professions, setProfessions] = useState([]);
  const fetchProfessions = async () => {
    try {
      const response = await axios.get(`${API_URL}/getAllProfessions`);
      setProfessions(response.data);
    } catch (error) {
      setError("Error occurred while fetching professions.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfessions();
    fetchUsers();
  }, []);
  const handleDeleteProfession = async (professionId) => {
    console.log(professionId);
    try {
      // Make an API call to delete the profession by its ID
      await axios.delete(`${API_URL}/deleteprofessions/${professionId}`);

      // Update the list of professions after successful deletion
      const updatedProfessions = professions.filter(
        (profession) => profession.id !== professionId
      );
      setProfessions(updatedProfessions);
      fetchProfessions();
    } catch (error) {
      setError("Error occurred while deleting profession.");
      console.error(error);
    }
  };
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/allusers`); // Assuming the API endpoint is "/api/allusers"
      setUsers(response.data);
    } catch (error) {
      setError("Error occurred while fetching users.");
      console.error(error);
    }
  };
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/deleteusers/${userId}`); // Assuming the endpoint for deleting a user is '/api/users/:id'

      // Filter out the deleted user from the state
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      setError("Error occurred while deleting user.");
      console.error(error);
    }
  };

  /////////////////////////////////////////////////
  const toggleAddProfession = () => {
    setShowAddProfession((prev) => !prev);
    setError("");
    setSuccessMessage("");
  };

  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const renderTabContent = () => {
    if (activeTab === "profession") {
      return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Profession Name</th>
                <th>Action</th> {/* New column for the Delete button */}
              </tr>
            </thead>
            <tbody>
              {professions.map((profession, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{profession.name}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteProfession(profession._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <Button
              type="button"
              variant="btn btn-outline-primary"
              onClick={toggleAddProfession}
            >
              {showAddProfession ? "Hide" : "Show"} ajouter une proffession
            </Button>
            {showAddProfession && (
              <Form onSubmit={handleAddProfession}>
                <br></br>
                <Form.Group controlId="professionName">
                  <h3>Profession Name:</h3>
                  <Form.Control
                    type="text"
                    value={professionName}
                    onChange={handleProfessionNameChange}
                  />
                </Form.Group>
                <br></br>
                <Button variant="btn btn-outline-primary" type="submit">
                  Add Profession
                </Button>
              </Form>
            )}
            {error && <p>{error}</p>}
            {successMessage && <p>{successMessage}</p>}
          </div>
        </div>
      );
    } else if (activeTab === "professionals") {
      // Render the table of professionals here
      return (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Profession</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.profession}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      );
    }
  };

  return (
    <div className="container-fluid h-100">
      <Row className="h-100">
        <Col sm="8" className="h-100">
          <div className="card custom-card">
            {/* Utiliser la classe custom-card */}
            <div className="card-body custom-card-body">
              {/* Ajouter la classe custom-card-body */}
              <Nav variant="tabs" defaultActiveKey="profession">
                <Nav.Item>
                  <Nav.Link
                    eventKey="profession"
                    onClick={() => handleTabChange("profession")}
                  >
                    Gestion Profession
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="professionals"
                    onClick={() => handleTabChange("professionals")}
                  >
                    Gestion des utilisateurs
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="tab-content mt-4">{renderTabContent()}</div>
            </div>
          </div>
        </Col>
      </Row>
      <style>{` 
       border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            /* Propriétés personnalisées pour ajuster la largeur */
            width: 800px; /* Largeur personnalisée */
            height: 600px;
            .custom-card-body {
            display: flex;
            flex-direction: column;
            height: 100%;
      
          .container-fluid {
            height: 100%;
            background-color: #f8f9fa;
            padding: 30px;
          }

          .card {
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .card-body {
          display: flex;
            flex-direction: column;
            height: 600px;

          .tab-content {
            margin-top: 16px;
          }

          .table {
            margin-bottom: 16px;
          }

          .table th,
          .table td {
            text-align: center;
            vertical-align: middle;
          }

          .btn {
            margin-right: 8px;
          }

          .form-group {
            margin-bottom: 16px;
          }

          .error-message,
          .success-message {
            color: red;
            margin-bottom: 8px;
          }

          .success-message {
            color: green;
          }

          /* Styles spécifiques pour les onglets */
          .nav-tabs {
            border-bottom: 2px solid #007bff;
          }

          .nav-link.active {
            background-color: #007bff;
            color: #fff;
          }

          /* Styles spécifiques pour les boutons */
          .btn-outline-primary {
            color: #007bff;
            border-color: #007bff;
          }

          .btn-outline-primary:hover {
            background-color: #007bff;
            color: #fff;
          }

          .btn-outline-primary:focus,
          .btn-outline-primary.focus {
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
          }

      `}</style>
    </div>
  );
};

export default ProfilAdmin;
